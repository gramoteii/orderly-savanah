
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useOrderStore } from '@/store/orderStore';
import { useClientStore } from '@/store/clientStore';
import { Label } from '@/components/ui/label';
import { HardDrive, HardDriveDownload, HardDriveUpload, Save } from 'lucide-react';

interface DataManagementProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DataManagement: React.FC<DataManagementProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('export');
  const [ordersJson, setOrdersJson] = useState<string>('');
  const [clientsJson, setClientsJson] = useState<string>('');
  const [importData, setImportData] = useState<string>('');
  const [importType, setImportType] = useState<'orders' | 'clients'>('orders');

  const { exportDataToJson: exportOrders, importDataFromJson: importOrders } = useOrderStore();
  const { exportDataToJson: exportClients, importDataFromJson: importClients } = useClientStore();

  const handleExportOrders = () => {
    const data = exportOrders();
    setOrdersJson(data);
    
    toast({
      title: "Успешно",
      description: "Данные заказов экспортированы"
    });
  };

  const handleExportClients = () => {
    const data = exportClients();
    setClientsJson(data);
    
    toast({
      title: "Успешно",
      description: "Данные клиентов экспортированы"
    });
  };

  const handleImport = () => {
    try {
      if (!importData.trim()) {
        toast({
          title: "Ошибка",
          description: "Пожалуйста, введите данные для импорта",
          variant: "destructive"
        });
        return;
      }

      if (importType === 'orders') {
        importOrders(importData);
      } else {
        importClients(importData);
      }

      toast({
        title: "Успешно",
        description: `Данные ${importType === 'orders' ? 'заказов' : 'клиентов'} успешно импортированы`
      });
      
      // Reset form
      setImportData('');
    } catch (error) {
      toast({
        title: "Ошибка импорта",
        description: error instanceof Error ? error.message : "Неверный формат данных",
        variant: "destructive"
      });
    }
  };

  const downloadJson = (data: string, filename: string) => {
    const blob = new Blob([data], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            Управление данными
          </DialogTitle>
          <DialogDescription>
            Экспорт и импорт данных в формате JSON
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="export">Экспорт данных</TabsTrigger>
            <TabsTrigger value="import">Импорт данных</TabsTrigger>
          </TabsList>
          
          <TabsContent value="export" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-medium">Данные заказов</Label>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={handleExportOrders}>
                    <HardDriveDownload className="h-4 w-4 mr-2" />
                    Экспортировать
                  </Button>
                  {ordersJson && (
                    <Button variant="default" size="sm" onClick={() => downloadJson(ordersJson, 'orders-export.json')}>
                      <Save className="h-4 w-4 mr-2" />
                      Скачать файл
                    </Button>
                  )}
                </div>
              </div>
              <Textarea 
                value={ordersJson} 
                readOnly 
                className="font-mono h-48"
                placeholder="Нажмите 'Экспортировать' для получения данных заказов" 
              />
            </div>
            
            <div className="space-y-2 pt-4 border-t">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-medium">Данные клиентов</Label>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={handleExportClients}>
                    <HardDriveDownload className="h-4 w-4 mr-2" />
                    Экспортировать
                  </Button>
                  {clientsJson && (
                    <Button variant="default" size="sm" onClick={() => downloadJson(clientsJson, 'clients-export.json')}>
                      <Save className="h-4 w-4 mr-2" />
                      Скачать файл
                    </Button>
                  )}
                </div>
              </div>
              <Textarea 
                value={clientsJson} 
                readOnly 
                className="font-mono h-48"
                placeholder="Нажмите 'Экспортировать' для получения данных клиентов" 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="import" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Label>Тип данных:</Label>
                <div className="flex border rounded-md">
                  <Button 
                    type="button"
                    variant={importType === 'orders' ? 'default' : 'outline'}
                    className={importType === 'orders' ? '' : 'border-0'}
                    onClick={() => setImportType('orders')}
                  >
                    Заказы
                  </Button>
                  <Button 
                    type="button"
                    variant={importType === 'clients' ? 'default' : 'outline'}
                    className={importType === 'clients' ? '' : 'border-0'}
                    onClick={() => setImportType('clients')}
                  >
                    Клиенты
                  </Button>
                </div>
              </div>
              
              <div>
                <Label>Вставьте JSON данные для импорта:</Label>
                <Textarea 
                  value={importData} 
                  onChange={(e) => setImportData(e.target.value)}
                  className="font-mono h-64 mt-2"
                  placeholder={`Вставьте ${importType === 'orders' ? 'заказы' : 'клиентов'} в формате JSON`}
                />
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleImport}>
                  <HardDriveUpload className="h-4 w-4 mr-2" />
                  Импортировать данные
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DataManagement;
