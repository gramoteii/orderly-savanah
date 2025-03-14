
import React from 'react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import { useOrderStore } from '../store/orderStore';
import { OrderStatus } from '../data/orders';
import { FileText, Check, Clock, X } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Dashboard: React.FC = () => {
  const { orders } = useOrderStore();

  // Calculate statistics
  const countByStatus = (status: OrderStatus) => {
    return orders.filter(order => order.status === status).length;
  };

  const totalRevenue = orders
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + order.total, 0);

  // Data for chart
  const chartData = [
    { name: 'Новые', value: countByStatus('new') },
    { name: 'В обработке', value: countByStatus('processing') },
    { name: 'Завершенные', value: countByStatus('completed') },
    { name: 'Отмененные', value: countByStatus('cancelled') },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Всего заказов"
            value={orders.length}
            icon={<FileText className="w-6 h-6 text-white" />}
            color="bg-crm-blue"
          />
          <StatCard
            title="Завершенные"
            value={countByStatus('completed')}
            icon={<Check className="w-6 h-6 text-white" />}
            color="bg-crm-green"
          />
          <StatCard
            title="В обработке"
            value={countByStatus('processing')}
            icon={<Clock className="w-6 h-6 text-white" />}
            color="bg-crm-yellow"
          />
          <StatCard
            title="Выручка"
            value={`${totalRevenue.toLocaleString()} ₽`}
            icon={<FileText className="w-6 h-6 text-white" />}
            color="bg-crm-blue"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Статистика заказов</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0D6EFD" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Последние заказы</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="crm-table-header">№ заказа</th>
                  <th className="crm-table-header">Дата</th>
                  <th className="crm-table-header">Клиент</th>
                  <th className="crm-table-header">Сумма</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="crm-table-cell font-medium">{order.number}</td>
                    <td className="crm-table-cell">{order.date}</td>
                    <td className="crm-table-cell">{order.customer.name}</td>
                    <td className="crm-table-cell font-medium">{order.total.toLocaleString()} ₽</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
