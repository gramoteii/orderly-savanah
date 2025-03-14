
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Order, OrderStatus, OrderItem } from '../data/orders';
import { useOrderStore } from '../store/orderStore';
import { Plus, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const generateOrderNumber = () => {
  return `ORD-${Math.floor(100 + Math.random() * 900)}`;
};

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const OrderForm: React.FC = () => {
  const { toast } = useToast();
  const { 
    currentOrder, 
    isEditModalOpen, 
    setEditModalOpen, 
    addOrder, 
    updateOrder 
  } = useOrderStore();

  const defaultOrder = {
    number: generateOrderNumber(),
    date: getCurrentDate(),
    status: 'new' as OrderStatus,
    customer: {
      id: nanoid(),
      name: '',
      email: '',
      phone: ''
    },
    items: [
      {
        id: nanoid(),
        name: '',
        quantity: 1,
        price: 0
      }
    ],
    total: 0,
    comments: ''
  };

  const [formData, setFormData] = useState<Omit<Order, 'id'>>(defaultOrder);

  useEffect(() => {
    if (currentOrder) {
      setFormData(currentOrder);
    } else {
      setFormData(defaultOrder);
    }
  }, [currentOrder, isEditModalOpen]);

  const calculateTotal = (items: OrderItem[]) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleAddItem = () => {
    const newItems = [
      ...formData.items,
      {
        id: nanoid(),
        name: '',
        quantity: 1,
        price: 0
      }
    ];
    
    setFormData({
      ...formData,
      items: newItems,
      total: calculateTotal(newItems)
    });
  };

  const handleRemoveItem = (id: string) => {
    if (formData.items.length <= 1) {
      return;
    }
    
    const newItems = formData.items.filter(item => item.id !== id);
    
    setFormData({
      ...formData,
      items: newItems,
      total: calculateTotal(newItems)
    });
  };

  const handleItemChange = (id: string, field: keyof OrderItem, value: string | number) => {
    const newItems = formData.items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        return updatedItem;
      }
      return item;
    });
    
    setFormData({
      ...formData,
      items: newItems,
      total: calculateTotal(newItems)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customer.name || !formData.customer.email || !formData.customer.phone) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните данные клиента",
        variant: "destructive"
      });
      return;
    }

    if (formData.items.some(item => !item.name || item.price <= 0)) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните данные всех товаров",
        variant: "destructive"
      });
      return;
    }

    if (currentOrder) {
      updateOrder({
        ...formData,
        id: currentOrder.id
      });
      toast({
        title: "Успешно",
        description: "Заказ успешно обновлен"
      });
    } else {
      addOrder(formData);
      toast({
        title: "Успешно",
        description: "Заказ успешно создан"
      });
    }
    
    setEditModalOpen(false);
  };

  return (
    <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>
            {currentOrder ? 'Редактировать заказ' : 'Создать новый заказ'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="number">Номер заказа</Label>
              <Input
                id="number"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="date">Дата</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="status">Статус</Label>
              <Select
                value={formData.status}
                onValueChange={(value: OrderStatus) => 
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Новый</SelectItem>
                  <SelectItem value="processing">В обработке</SelectItem>
                  <SelectItem value="completed">Завершен</SelectItem>
                  <SelectItem value="cancelled">Отменен</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Данные клиента</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="customerName">Имя</Label>
                <Input
                  id="customerName"
                  value={formData.customer.name}
                  onChange={(e) => 
                    setFormData({
                      ...formData,
                      customer: { ...formData.customer, name: e.target.value }
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="customerEmail">Email</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={formData.customer.email}
                  onChange={(e) => 
                    setFormData({
                      ...formData,
                      customer: { ...formData.customer, email: e.target.value }
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="customerPhone">Телефон</Label>
                <Input
                  id="customerPhone"
                  value={formData.customer.phone}
                  onChange={(e) => 
                    setFormData({
                      ...formData,
                      customer: { ...formData.customer, phone: e.target.value }
                    })
                  }
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Товары</h3>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={handleAddItem}
              >
                <Plus className="h-4 w-4 mr-2" />
                Добавить товар
              </Button>
            </div>
            
            {formData.items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-5">
                  <Label htmlFor={`item-name-${index}`}>Наименование</Label>
                  <Input
                    id={`item-name-${index}`}
                    value={item.name}
                    onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor={`item-quantity-${index}`}>Кол-во</Label>
                  <Input
                    id={`item-quantity-${index}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => 
                      handleItemChange(item.id, 'quantity', parseInt(e.target.value))
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
                      handleItemChange(item.id, 'price', parseInt(e.target.value))
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
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={formData.items.length <= 1}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="text-right mt-4">
              <p className="text-lg font-medium">
                Итого: {formData.total.toLocaleString()} ₽
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <Label htmlFor="comments">Комментарии</Label>
            <Textarea
              id="comments"
              value={formData.comments || ''}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditModalOpen(false)}
            >
              Отмена
            </Button>
            <Button type="submit">
              {currentOrder ? 'Сохранить изменения' : 'Создать заказ'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderForm;
