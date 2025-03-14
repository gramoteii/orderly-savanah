
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import RevenueChart from '../components/RevenueChart';
import { useOrderStore } from '../store/orderStore';
import { OrderStatus } from '../data/orders';
import { FileText, Check, Clock, X, Users, BarChart, Briefcase } from 'lucide-react';
import { useClientStore } from '../store/clientStore';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  generateDailyData,
  generateWeeklyData,
  generateMonthlyData,
  generateQuarterlyData,
  generateYearlyData
} from '../utils/chartDataGenerator';

const Dashboard: React.FC = () => {
  const { orders } = useOrderStore();
  const { clients } = useClientStore();
  
  const [chartData, setChartData] = useState({
    daily: generateDailyData(),
    weekly: generateWeeklyData(),
    monthly: generateMonthlyData(),
    quarterly: generateQuarterlyData(),
    yearly: generateYearlyData()
  });
  
  // Re-generate data when component mounts
  useEffect(() => {
    setChartData({
      daily: generateDailyData(),
      weekly: generateWeeklyData(),
      monthly: generateMonthlyData(),
      quarterly: generateQuarterlyData(),
      yearly: generateYearlyData()
    });
  }, []);

  // Calculate statistics
  const countByStatus = (status: OrderStatus) => {
    return orders.filter(order => order.status === status).length;
  };

  const totalRevenue = orders
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + order.total, 0);
    
  const averageOrderValue = orders.length > 0 
    ? Math.round(orders.reduce((sum, order) => sum + order.total, 0) / orders.length) 
    : 0;

  // Calculate completion ratio
  const completedOrders = countByStatus('completed');
  const completionRatio = orders.length > 0 
    ? Math.round((completedOrders / orders.length) * 100) 
    : 0;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Всего проектов"
            value={orders.length}
            icon={<Briefcase className="w-6 h-6 text-white" />}
            color="bg-crm-blue"
          />
          <StatCard
            title="Завершенные"
            value={`${completedOrders} (${completionRatio}%)`}
            icon={<Check className="w-6 h-6 text-white" />}
            color="bg-crm-green"
          />
          <StatCard
            title="Клиенты"
            value={clients.length}
            icon={<Users className="w-6 h-6 text-white" />}
            color="bg-crm-yellow"
          />
          <StatCard
            title="Выручка"
            value={`${totalRevenue.toLocaleString()} ₽`}
            icon={<BarChart className="w-6 h-6 text-white" />}
            color="bg-crm-blue"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart 
              dailyData={chartData.daily}
              weeklyData={chartData.weekly}
              monthlyData={chartData.monthly}
              quarterlyData={chartData.quarterly}
              yearlyData={chartData.yearly}
            />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Статистика проектов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Новые проекты</span>
                    <span className="font-medium">{countByStatus('new')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">В работе</span>
                    <span className="font-medium">{countByStatus('processing')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Завершенные</span>
                    <span className="font-medium">{countByStatus('completed')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Отмененные</span>
                    <span className="font-medium">{countByStatus('cancelled')}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Средний чек</span>
                      <span className="font-medium">{averageOrderValue.toLocaleString()} ₽</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Последние проекты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex justify-between">
                      <div className="flex flex-col">
                        <span className="font-medium">{order.number}</span>
                        <span className="text-xs text-muted-foreground">{order.customer.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{order.total.toLocaleString()} ₽</span>
                        <span className="text-xs text-muted-foreground block">{order.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
