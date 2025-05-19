
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface OrderFormHeaderProps {
  isEditing: boolean;
}

const OrderFormHeader: React.FC<OrderFormHeaderProps> = ({ isEditing }) => {
  return (
    <DialogHeader>
      <DialogTitle>
        {isEditing ? 'Редактировать заказ' : 'Создать новый заказ'}
      </DialogTitle>
      <DialogDescription>
        Заполните информацию о заказе и услугах
      </DialogDescription>
    </DialogHeader>
  );
};

export default OrderFormHeader;
