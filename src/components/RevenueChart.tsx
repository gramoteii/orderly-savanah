
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { Calendar, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@/components/ui/chart';

type TimeFrame = 'day' | 'week' | 'month' | 'quarter' | 'year';
type ChartData = Array<{ name: string; value: number }>;

interface RevenueChartProps {
  dailyData: ChartData;
  weeklyData: ChartData;
  monthlyData: ChartData;
  quarterlyData: ChartData;
  yearlyData: ChartData;
}

const RevenueChart: React.FC<RevenueChartProps> = ({
  dailyData,
  weeklyData,
  monthlyData,
  quarterlyData,
  yearlyData,
}) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('month');

  const getChartData = () => {
    switch (timeFrame) {
      case 'day':
        return dailyData;
      case 'week':
        return weeklyData;
      case 'month':
        return monthlyData;
      case 'quarter':
        return quarterlyData;
      case 'year':
        return yearlyData;
      default:
        return monthlyData;
    }
  };

  const getChartTitle = () => {
    switch (timeFrame) {
      case 'day':
        return 'Выручка по дням';
      case 'week':
        return 'Выручка по неделям';
      case 'month':
        return 'Выручка по месяцам';
      case 'quarter':
        return 'Выручка по кварталам';
      case 'year':
        return 'Выручка по годам';
      default:
        return 'Выручка';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            {getChartTitle()}
          </CardTitle>
          <div className="flex space-x-2">
            <Button 
              variant={timeFrame === 'day' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setTimeFrame('day')}
            >
              <Clock className="mr-1 h-3.5 w-3.5" />
              День
            </Button>
            <Button 
              variant={timeFrame === 'week' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setTimeFrame('week')}
            >
              <Clock className="mr-1 h-3.5 w-3.5" />
              Неделя
            </Button>
            <Button 
              variant={timeFrame === 'month' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setTimeFrame('month')}
            >
              <Calendar className="mr-1 h-3.5 w-3.5" />
              Месяц
            </Button>
            <Button 
              variant={timeFrame === 'quarter' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setTimeFrame('quarter')}
            >
              <Calendar className="mr-1 h-3.5 w-3.5" />
              Квартал
            </Button>
            <Button 
              variant={timeFrame === 'year' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setTimeFrame('year')}
            >
              <Calendar className="mr-1 h-3.5 w-3.5" />
              Год
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer config={{ value: { theme: { light: '#0D6EFD', dark: '#3b82f6' } } }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getChartData()} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <ChartTooltip 
                  content={({ active, payload }) => 
                    <ChartTooltipContent 
                      active={active} 
                      payload={payload} 
                      formatter={(value) => [`${value.toLocaleString()} ₽`, 'Выручка']}
                    />
                  } 
                />
                <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
