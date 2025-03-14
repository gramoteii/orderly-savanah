
import React from 'react';
import { OrderStatus } from '../data/orders';

interface StatusBadgeProps {
  status: OrderStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'new':
        return 'crm-status-new';
      case 'processing':
        return 'crm-status-processing';
      case 'completed':
        return 'crm-status-completed';
      case 'cancelled':
        return 'crm-status-cancelled';
      default:
        return 'crm-status-new';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'new':
        return 'Новый';
      case 'processing':
        return 'В обработке';
      case 'completed':
        return 'Завершен';
      case 'cancelled':
        return 'Отменен';
      default:
        return 'Новый';
    }
  };

  return (
    <span className={`crm-status-badge ${getStatusClass()}`}>
      {getStatusText()}
    </span>
  );
};

export default StatusBadge;
