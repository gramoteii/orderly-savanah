
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Order } from '../../data/orders';

interface OrderFormHeaderProps {
  isEditing: boolean;
  currentOrder?: Order | null;
}

const OrderFormHeader: React.FC<OrderFormHeaderProps> = ({ isEditing, currentOrder }) => {
  return (
    <DialogHeader>
      <DialogTitle>
        {isEditing ? 'Редактировать заказ' : 'Создать новый заказ'}
        {isEditing && currentOrder && (
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            #{currentOrder.number}
          </span>
        )}
      </DialogTitle>
      <DialogDescription>
        {isEditing && currentOrder ? (
          <div className="flex flex-col space-y-1">
            <span>Заполните информацию о заказе и услугах</span>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="font-medium">Клиент: {currentOrder.customer.name}</span>
              <span className="font-medium">Сумма: {currentOrder.total.toLocaleString()} ₽</span>
              <span className="font-medium">Дата: {currentOrder.date}</span>
            </div>
          </div>
        ) : (
          'Заполните информацию о заказе и услугах'
        )}
      </DialogDescription>
    </DialogHeader>
  );
};

export default OrderFormHeader;
