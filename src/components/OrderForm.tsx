
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
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
import { useClientStore } from '../store/clientStore';
import { Plus, Trash, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Services specific to an IT/web studio
const webStudioServices = [
  { name: 'Разработка веб-сайта', defaultPrice: 100000 },
  { name: 'Дизайн UI/UX', defaultPrice: 50000 },
  { name: 'Разработка мобильного приложения', defaultPrice: 200000 },
  { name: 'SEO-оптимизация', defaultPrice: 30000 },
  { name: 'Техническая поддержка', defaultPrice: 20000 },
  { name: 'Редизайн сайта', defaultPrice: 70000 },
  { name: 'Настройка CRM', defaultPrice: 40000 },
  { name: 'Разработка логотипа', defaultPrice: 25000 },
  { name: 'SMM-продвижение', defaultPrice: 35000 },
  { name: 'Контекстная реклама', defaultPrice: 30000 },
];

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
  
  const { clients, incrementClientOrders, decrementClientOrders } = useClientStore();

  const defaultOrder = {
    number: generateOrderNumber(),
    date: getCurrentDate(),
    status: 'new' as OrderStatus,
    customer: {
      id: '',
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
  const [selectedClientId, setSelectedClientId] = useState<string>('');

  useEffect(() => {
    if (currentOrder) {
      setFormData(currentOrder);
      setSelectedClientId(currentOrder.customer.id);
    } else {
      setFormData(defaultOrder);
      setSelectedClientId('');
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

  const handleServiceSelect = (id: string, serviceName: string) => {
    if (serviceName === 'custom') {
      handleItemChange(id, 'name', '');
      handleItemChange(id, 'price', 0);
      return;
    }

    const service = webStudioServices.find(s => s.name === serviceName);
    if (service) {
      handleItemChange(id, 'name', service.name);
      handleItemChange(id, 'price', service.defaultPrice);
    }
  };

  const handleClientSelect = (clientId: string) => {
    const selectedClient = clients.find(client => client.id === clientId);
    if (selectedClient) {
      setSelectedClientId(clientId);
      setFormData({
        ...formData,
        customer: {
          id: selectedClient.id,
          name: selectedClient.name,
          email: selectedClient.email,
          phone: selectedClient.phone
        }
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customer.id) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите клиента",
        variant: "destructive"
      });
      return;
    }

    if (formData.items.some(item => !item.name || item.price <= 0)) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните данные всех услуг",
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
      // Increment the client's order count
      incrementClientOrders(formData.customer.id);
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
          <DialogDescription>
            Заполните информацию о заказе и услугах
          </DialogDescription>
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
                  <SelectItem value="processing">В разработке</SelectItem>
                  <SelectItem value="completed">Завершен</SelectItem>
                  <SelectItem value="cancelled">Отменен</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Данные клиента</h3>
            <div className="mb-4">
              <Label htmlFor="client">Выберите клиента</Label>
              <Select
                value={selectedClientId}
                onValueChange={handleClientSelect}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите клиента" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{client.name}</span>
                        {client.company && <span className="text-gray-500">({client.company})</span>}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedClientId && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Имя</Label>
                  <Input value={formData.customer.name} readOnly className="bg-gray-50" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={formData.customer.email} readOnly className="bg-gray-50" />
                </div>
                <div>
                  <Label>Телефон</Label>
                  <Input value={formData.customer.phone} readOnly className="bg-gray-50" />
                </div>
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Услуги</h3>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={handleAddItem}
              >
                <Plus className="h-4 w-4 mr-2" />
                Добавить услугу
              </Button>
            </div>
            
            {formData.items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 mb-4">
                <div className="col-span-5">
                  <Label htmlFor={`item-name-${index}`}>Услуга</Label>
                  <Select
                    value={item.name || ""}
                    onValueChange={(value) => handleServiceSelect(item.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      {webStudioServices.map((service) => (
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
                      onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
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
                      handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 1)
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
                      handleItemChange(item.id, 'price', parseInt(e.target.value) || 0)
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
              placeholder="Сроки, особые требования, дополнительная информация..."
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
