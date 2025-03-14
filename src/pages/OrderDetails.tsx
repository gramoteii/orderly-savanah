
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import StatusBadge from '../components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Edit, Trash } from 'lucide-react';
import { useOrderStore } from '../store/orderStore';
import { Order } from '../data/orders';

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    getOrderById, 
    setCurrentOrder, 
    setEditModalOpen, 
    setDeleteModalOpen 
  } = useOrderStore();
  
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (id) {
      const foundOrder = getOrderById(id);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        navigate('/orders');
      }
    }
  }, [id, getOrderById, navigate]);

  if (!order) {
    return null;
  }

  const handleEdit = () => {
    setCurrentOrder(order);
    setEditModalOpen(true);
  };

  const handleDelete = () => {
    setCurrentOrder(order);
    setDeleteModalOpen(true);
  };

  return (
    <Layout>
      <div className="mb-6 flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={() => navigate('/orders')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад к списку
        </Button>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={handleEdit}
          >
            <Edit className="h-4 w-4 mr-2" />
            Редактировать
          </Button>
          <Button 
            variant="outline" 
            className="text-crm-red border-crm-red hover:bg-red-50"
            onClick={handleDelete}
          >
            <Trash className="h-4 w-4 mr-2" />
            Удалить
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Заказ №{order.number}
                  </h2>
                  <p className="text-gray-500">
                    от {order.date}
                  </p>
                </div>
                <StatusBadge status={order.status} />
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Товары</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left pb-2">Наименование</th>
                        <th className="text-right pb-2">Кол-во</th>
                        <th className="text-right pb-2">Цена</th>
                        <th className="text-right pb-2">Сумма</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr key={item.id} className="border-t">
                          <td className="py-3">{item.name}</td>
                          <td className="py-3 text-right">{item.quantity}</td>
                          <td className="py-3 text-right">{item.price.toLocaleString()} ₽</td>
                          <td className="py-3 text-right">
                            {(item.price * item.quantity).toLocaleString()} ₽
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t">
                        <td colSpan={3} className="py-3 text-right font-semibold">
                          Итого:
                        </td>
                        <td className="py-3 text-right font-semibold">
                          {order.total.toLocaleString()} ₽
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {order.comments && (
                <>
                  <Separator className="my-4" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Комментарии</h3>
                    <p className="text-gray-700">{order.comments}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Информация о клиенте</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm text-gray-500">Имя</dt>
                  <dd className="font-medium">{order.customer.name}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Email</dt>
                  <dd className="font-medium">{order.customer.email}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Телефон</dt>
                  <dd className="font-medium">{order.customer.phone}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetails;
