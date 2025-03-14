
import React, { useMemo } from 'react';
import { ru } from 'date-fns/locale';
import { format, parse, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { useOrderStore } from '@/store/orderStore';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from 'recharts';

const MonthlyRevenueChart = () => {
  const { orders } = useOrderStore();

  const chartData = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const months = [];

    // Create array of all months
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(currentYear, i, 1);
      months.push({
        month: format(monthDate, 'MMMM', { locale: ru }),
        revenue: 0,
        orders: 0,
      });
    }

    // Fill in data from orders
    orders.forEach(order => {
      const orderDate = parse(order.date, 'yyyy-MM-dd', new Date());
      if (orderDate.getFullYear() === currentYear && order.status !== 'cancelled') {
        const monthIndex = orderDate.getMonth();
        months[monthIndex].revenue += order.total;
        months[monthIndex].orders += 1;
      }
    });

    return months;
  }, [orders]);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Выручка по месяцам ({new Date().getFullYear()})</CardTitle>
        <CardDescription>
          Статистика доходов и количества проектов
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                tickFormatter={(value) => `${value / 1000}k ₽`}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(value) => `${value} шт`}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'revenue') return [`${value.toLocaleString()} ₽`, 'Выручка'];
                  return [`${value} шт`, 'Заказы'];
                }}
              />
              <Bar
                yAxisId="left"
                dataKey="revenue"
                fill="#6366f1"
                radius={[4, 4, 0, 0]}
                name="revenue"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                stroke="#f97316"
                strokeWidth={2}
                name="orders"
                dot={{ r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyRevenueChart;
