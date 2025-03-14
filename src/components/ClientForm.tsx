
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useClientStore, Client } from '../store/clientStore';
import { useToast } from '@/hooks/use-toast';

// Source options for IT/web studio clients
const clientSources = [
  'Сайт компании',
  'Рекомендация',
  'Холодный звонок',
  'Email-рассылка',
  'Конференция',
  'Выставка',
  'Поисковая реклама',
  'Социальные сети',
  'Партнерство',
  'Другое'
];

const ClientForm: React.FC = () => {
  const { toast } = useToast();
  const { 
    currentClient, 
    isModalOpen, 
    setModalOpen, 
    addClient, 
    updateClient 
  } = useClientStore();

  const defaultClient = {
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    website: '',
    source: ''
  };

  const [formData, setFormData] = useState<Omit<Client, 'id' | 'orders'>>(defaultClient);

  useEffect(() => {
    if (currentClient) {
      // Exclude id and orders when populating form
      const { id, orders, ...rest } = currentClient;
      setFormData(rest);
    } else {
      setFormData(defaultClient);
    }
  }, [currentClient, isModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните обязательные поля",
        variant: "destructive"
      });
      return;
    }

    if (currentClient) {
      updateClient({
        ...formData,
        id: currentClient.id,
        orders: currentClient.orders
      });
      toast({
        title: "Успешно",
        description: "Данные клиента обновлены"
      });
    } else {
      addClient(formData);
      toast({
        title: "Успешно",
        description: "Клиент успешно добавлен"
      });
    }
    
    setModalOpen(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {currentClient ? 'Редактировать клиента' : 'Добавить нового клиента'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-right">
                Имя<span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Компания</Label>
              <Input
                id="company"
                value={formData.company || ''}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">
                Email<span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position">Должность</Label>
              <Input
                id="position"
                value={formData.position || ''}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">
                Телефон<span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Веб-сайт</Label>
              <Input
                id="website"
                value={formData.website || ''}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="source">Источник</Label>
              <Select
                value={formData.source || ''}
                onValueChange={(value) => setFormData({ ...formData, source: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите источник" />
                </SelectTrigger>
                <SelectContent>
                  {clientSources.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
            >
              Отмена
            </Button>
            <Button type="submit">
              {currentClient ? 'Сохранить изменения' : 'Добавить клиента'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClientForm;
