
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { OrderItem } from '../../data/orders';

export interface ServiceOption {
  name: string;
  defaultPrice: number;
}

interface ServiceItemProps {
  item: OrderItem;
  index: number;
  serviceOptions: ServiceOption[];
  canDelete: boolean;
  onServiceSelect: (id: string, serviceName: string) => void;
  onItemChange: (id: string, field: keyof OrderItem, value: string | number) => void;
  onRemoveItem: (id: string) => void;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  item,
  index,
  serviceOptions,
  canDelete,
  onServiceSelect,
  onItemChange,
  onRemoveItem
}) => {
  return (
    <div className="grid grid-cols-12 gap-4 mb-4">
      <div className="col-span-5">
        <Label htmlFor={`item-name-${index}`}>Услуга</Label>
        <Select
          value={item.name || ""}
          onValueChange={(value) => onServiceSelect(item.id, value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите услугу" />
          </SelectTrigger>
          <SelectContent>
            {serviceOptions.map((service) => (
              <SelectItem key={service.name} value={service.name}>
                {service.name}
              </SelectItem>
            ))}
            <SelectItem value="custom">Другое</SelectItem>
          </SelectContent>
        </Select>
        {item.name === '' && (
          <Input
            className="mt-2"
            placeholder="Введите название услуги"
            value={item.name}
            onChange={(e) => onItemChange(item.id, 'name', e.target.value)}
          />
        )}
      </div>
      <div className="col-span-2">
        <Label htmlFor={`item-quantity-${index}`}>Кол-во</Label>
        <Input
          id={`item-quantity-${index}`}
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => 
            onItemChange(item.id, 'quantity', parseInt(e.target.value) || 1)
          }
          required
        />
      </div>
      <div className="col-span-3">
        <Label htmlFor={`item-price-${index}`}>Цена</Label>
        <Input
          id={`item-price-${index}`}
          type="number"
          min="0"
          value={item.price}
          onChange={(e) => 
            onItemChange(item.id, 'price', parseInt(e.target.value) || 0)
          }
          required
        />
      </div>
      <div className="col-span-2 flex items-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full text-crm-red border-crm-red hover:bg-red-50"
          onClick={() => onRemoveItem(item.id)}
          disabled={!canDelete}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ServiceItem;
