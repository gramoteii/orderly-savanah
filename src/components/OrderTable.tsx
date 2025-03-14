
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '../store/orderStore';
import StatusBadge from './StatusBadge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash } from 'lucide-react';
import { Order } from '../data/orders';

const OrderTable: React.FC = () => {
  const navigate = useNavigate();
  const { filteredOrders, setCurrentOrder, setEditModalOpen, setDeleteModalOpen } = useOrderStore();

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

  if (filteredOrders.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-gray-500">Заказы не найдены</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="crm-table-header">№ заказа</th>
              <th className="crm-table-header">Дата</th>
              <th className="crm-table-header">Клиент</th>
              <th className="crm-table-header">Статус</th>
              <th className="crm-table-header">Сумма</th>
              <th className="crm-table-header">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr 
                key={order.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleViewOrder(order)}
              >
                <td className="crm-table-cell font-medium">{order.number}</td>
                <td className="crm-table-cell">{order.date}</td>
                <td className="crm-table-cell">{order.customer.name}</td>
                <td className="crm-table-cell">
                  <StatusBadge status={order.status} />
                </td>
                <td className="crm-table-cell font-medium">{order.total.toLocaleString()} ₽</td>
                <td className="crm-table-cell">
                  <div className="flex space-x-2">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
