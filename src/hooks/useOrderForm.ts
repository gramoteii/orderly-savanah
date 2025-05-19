
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Order, OrderItem, OrderStatus } from '../data/orders';
import { useClientStore } from '../store/clientStore';
import { useToast } from '@/hooks/use-toast';

// Services specific to an IT/web studio
export const webStudioServices = [
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

export const useOrderForm = (
  currentOrder: Order | null,
  isEditModalOpen: boolean,
  onSave: (order: Omit<Order, 'id'>) => void,
  onCancel: () => void
) => {
  const { toast } = useToast();
  const { clients, incrementClientOrders } = useClientStore();

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

    if (!currentOrder) {
      // Increment client orders only for new orders
      incrementClientOrders(formData.customer.id);
    }
    
    onSave(formData);
  };

  return {
    formData,
    selectedClientId,
    handleAddItem,
    handleRemoveItem,
    handleItemChange,
    handleServiceSelect,
    handleClientSelect,
    handleSubmit,
    setFormData,
  };
};
