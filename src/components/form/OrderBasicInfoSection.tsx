
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OrderStatus } from '../../data/orders';

interface OrderBasicInfoSectionProps {
  number: string;
  date: string;
  status: OrderStatus;
  onNumberChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onStatusChange: (value: OrderStatus) => void;
}

const OrderBasicInfoSection: React.FC<OrderBasicInfoSectionProps> = ({
  number,
  date,
  status,
  onNumberChange,
  onDateChange,
  onStatusChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label htmlFor="number">Номер заказа</Label>
        <Input
          id="number"
          value={number}
          onChange={(e) => onNumberChange(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="date">Дата</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="status">Статус</Label>
        <Select
          value={status}
          onValueChange={(value: OrderStatus) => onStatusChange(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">Новый</SelectItem>
            <SelectItem value="processing">В разработке</SelectItem>
            <SelectItem value="completed">Завершен</SelectItem>
            <SelectItem value="cancelled">Отменен</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default OrderBasicInfoSection;
