
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
import { List, Kanban } from 'lucide-react';

const Orders: React.FC = () => {
  const { filterOrders } = useOrderStore();
  const [viewMode, setViewMode] = useState<'table' | 'board'>('board');

  useEffect(() => {
    filterOrders();
  }, []);

  return (
    <Layout>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Заказы</h1>
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
