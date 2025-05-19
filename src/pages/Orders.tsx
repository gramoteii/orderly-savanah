
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import OrderFilter from '../components/OrderFilter';
import OrderTable from '../components/OrderTable';
import OrderBoard from '../components/OrderBoard'; 
import OrderForm from '../components/OrderForm';
import DeleteOrderDialog from '../components/DeleteOrderDialog';
import MonthlyRevenueChart from '../components/MonthlyRevenueChart';
import DataManagement from '../components/DataManagement';
import { useOrderStore } from '../store/orderStore';
import { Button } from '@/components/ui/button';
import { 
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable";
import { List, Kanban, FileCode, PlusCircle, HardDrive } from 'lucide-react';

const Orders: React.FC = () => {
  const { filterOrders, setCurrentOrder, setEditModalOpen } = useOrderStore();
  const [viewMode, setViewMode] = useState<'table' | 'board'>('board');
  const [isDataManagementOpen, setIsDataManagementOpen] = useState(false);

  useEffect(() => {
    filterOrders();
  }, []);

  const handleCreateOrder = () => {
    setCurrentOrder(null);
    setEditModalOpen(true);
  };

  return (
    <Layout>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <FileCode className="h-6 w-6 mr-2 text-primary" />
          <h1 className="text-2xl font-bold">Проекты</h1>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={viewMode === 'table' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('table')}
          >
            <List className="mr-2 h-4 w-4" />
            Таблица
          </Button>
          <Button 
            variant={viewMode === 'board' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('board')}
          >
            <Kanban className="mr-2 h-4 w-4" />
            Доска
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsDataManagementOpen(true)}
          >
            <HardDrive className="mr-2 h-4 w-4" />
            Управление данными
          </Button>
          <Button 
            variant="default"
            onClick={handleCreateOrder}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Новый проект
          </Button>
        </div>
      </div>
      
      <MonthlyRevenueChart />
      
      <OrderFilter />
      
      {viewMode === 'table' ? (
        <OrderTable />
      ) : (
        <OrderBoard />
      )}
      
      <OrderForm />
      <DeleteOrderDialog />
      <DataManagement open={isDataManagementOpen} onOpenChange={setIsDataManagementOpen} />
    </Layout>
  );
};

export default Orders;
