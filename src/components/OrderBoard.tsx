
import React from 'react';
import { useOrderStore } from '../store/orderStore';
import { Order, OrderStatus } from '../data/orders';
import StatusBadge from './StatusBadge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DragItem {
  order: Order;
  status: OrderStatus;
}

const OrderBoard: React.FC = () => {
  const navigate = useNavigate();
  const { filteredOrders, updateOrder, setCurrentOrder, setEditModalOpen, setDeleteModalOpen } = useOrderStore();

  const ordersByStatus = {
    new: filteredOrders.filter(order => order.status === 'new'),
    processing: filteredOrders.filter(order => order.status === 'processing'),
    completed: filteredOrders.filter(order => order.status === 'completed'),
    cancelled: filteredOrders.filter(order => order.status === 'cancelled')
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, order: Order, status: OrderStatus) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ order, status }));
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('opacity-50');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-blue-50');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('bg-blue-50');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: OrderStatus) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-blue-50');
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json')) as DragItem;
      const { order } = data;
      
      if (order.status !== newStatus) {
        const updatedOrder = { ...order, status: newStatus };
        updateOrder(updatedOrder);
      }
    } catch (error) {
      console.error('Error during drag and drop:', error);
    }
  };

  const handleViewOrder = (order: Order) => {
    navigate(`/orders/${order.id}`);
  };

  const handleEditOrder = (e: React.MouseEvent, order: Order) => {
    e.stopPropagation();
    setCurrentOrder(order);
    setEditModalOpen(true);
  };

  const handleDeleteOrder = (e: React.MouseEvent, order: Order) => {
    e.stopPropagation();
    setCurrentOrder(order);
    setDeleteModalOpen(true);
  };
  
  const statusTitles = {
    new: 'Новые',
    processing: 'В обработке',
    completed: 'Завершенные',
    cancelled: 'Отмененные'
  };

  const renderCard = (order: Order) => (
    <div 
      key={order.id}
      className="bg-white p-4 rounded-md shadow-sm mb-3 cursor-pointer border border-gray-200 hover:shadow-md transition-shadow"
      draggable
      onDragStart={(e) => handleDragStart(e, order, order.status)}
      onDragEnd={handleDragEnd}
      onClick={() => handleViewOrder(order)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{order.number}</h3>
        <StatusBadge status={order.status} />
      </div>
      <div className="text-sm text-gray-600 mb-2">
        <p>{order.customer.name}</p>
        <p className="font-semibold">{order.total.toLocaleString()} ₽</p>
      </div>
      <div className="flex space-x-2 mt-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={(e) => {
            e.stopPropagation();
            handleViewOrder(order);
          }}
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={(e) => handleEditOrder(e, order)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-crm-red border-crm-red hover:bg-red-50"
          onClick={(e) => handleDeleteOrder(e, order)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {(Object.keys(ordersByStatus) as OrderStatus[]).map((status) => (
        <div 
          key={status}
          className="bg-gray-50 p-4 rounded-md overflow-hidden"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, status)}
        >
          <h2 className="font-bold mb-4 pb-2 border-b">{statusTitles[status]} ({ordersByStatus[status].length})</h2>
          <div className="space-y-3 min-h-40">
            {ordersByStatus[status].map(order => renderCard(order))}
            {ordersByStatus[status].length === 0 && (
              <div className="text-gray-400 text-center py-8">
                Перетащите заказы сюда
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderBoard;
