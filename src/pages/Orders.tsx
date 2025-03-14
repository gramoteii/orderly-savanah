
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import OrderFilter from '../components/OrderFilter';
import OrderTable from '../components/OrderTable';
import OrderBoard from '../components/OrderBoard'; 
import OrderForm from '../components/OrderForm';
import DeleteOrderDialog from '../components/DeleteOrderDialog';
import { useOrderStore } from '../store/orderStore';
import { Button } from '@/components/ui/button';
import { 
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable";
import { useState } from 'react';
import { List, Kanban, FileCode, PlusCircle } from 'lucide-react';

const Orders: React.FC = () => {
  const { filterOrders, setCurrentOrder, setEditModalOpen } = useOrderStore();
  const [viewMode, setViewMode] = useState<'table' | 'board'>('board');

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
            variant="default"
            onClick={handleCreateOrder}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Новый проект
          </Button>
        </div>
      </div>
      
      <OrderFilter />
      
      {viewMode === 'table' ? (
        <OrderTable />
      ) : (
        <OrderBoard />
      )}
      
      <OrderForm />
      <DeleteOrderDialog />
    </Layout>
  );
};

export default Orders;
