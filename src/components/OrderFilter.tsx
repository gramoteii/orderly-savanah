
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useOrderStore } from '../store/orderStore';
import { Search, Plus } from 'lucide-react';
import { OrderStatus } from '../data/orders';

const OrderFilter: React.FC = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    statusFilter, 
    setStatusFilter,
    setCurrentOrder,
    setEditModalOpen
  } = useOrderStore();

  const handleCreateOrder = () => {
    setCurrentOrder(null);
    setEditModalOpen(true);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Поиск по номеру заказа, имени или email клиента"
              className="pl-10"
            />
          </div>
        </div>
        <div className="md:col-span-3">
          <Select
            value={statusFilter}
            onValueChange={(value: OrderStatus | 'all') => setStatusFilter(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Фильтр по статусу" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="new">Новые</SelectItem>
              <SelectItem value="processing">В обработке</SelectItem>
              <SelectItem value="completed">Завершенные</SelectItem>
              <SelectItem value="cancelled">Отмененные</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-4 flex justify-end">
          <Button onClick={handleCreateOrder} className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Создать заказ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderFilter;
