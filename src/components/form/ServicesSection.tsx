
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ServiceItem, { ServiceOption } from './ServiceItem';
import { OrderItem } from '../../data/orders';

interface ServicesSectionProps {
  items: OrderItem[];
  total: number;
  serviceOptions: ServiceOption[];
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onItemChange: (id: string, field: keyof OrderItem, value: string | number) => void;
  onServiceSelect: (id: string, serviceName: string) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  items,
  total,
  serviceOptions,
  onAddItem,
  onRemoveItem,
  onItemChange,
  onServiceSelect
}) => {
  return (
    <div className="border-t pt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Услуги</h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={onAddItem}
        >
          <Plus className="h-4 w-4 mr-2" />
          Добавить услугу
        </Button>
      </div>
      
      {items.map((item, index) => (
        <ServiceItem
          key={item.id}
          item={item}
          index={index}
          serviceOptions={serviceOptions}
          canDelete={items.length > 1}
          onServiceSelect={onServiceSelect}
          onItemChange={onItemChange}
          onRemoveItem={onRemoveItem}
        />
      ))}
      
      <div className="text-right mt-4">
        <p className="text-lg font-medium">
          Итого: {total.toLocaleString()} ₽
        </p>
      </div>
    </div>
  );
};

export default ServicesSection;
