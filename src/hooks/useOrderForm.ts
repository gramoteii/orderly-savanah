
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Order, OrderStatus } from '../data/orders';
import { useClientStore } from '../store/clientStore';
import { useToast } from '@/hooks/use-toast';
import { useOrderServices } from './order/useOrderServices';
import { generateOrderNumber, getCurrentDate } from '../utils/orderUtils';

export { webStudioServices } from './order/useOrderServices';

export const useOrderForm = (
  currentOrder: Order | null,
  isEditModalOpen: boolean,
  onSave: (order: Omit<Order, 'id'>) => void,
  onCancel: () => void
) => {
  const { toast } = useToast();
  const { clients, incrementClientOrders } = useClientStore();
  const { calculateTotal, handleAddItem, handleRemoveItem, handleItemChange: serviceItemChange, handleServiceSelect: selectService } = useOrderServices();

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

  const handleAddOrderItem = () => {
    const newItems = handleAddItem(formData.items);
    
    setFormData({
      ...formData,
      items: newItems,
      total: calculateTotal(newItems)
    });
  };

  const handleRemoveOrderItem = (id: string) => {
    const newItems = handleRemoveItem(formData.items, id);
    
    setFormData({
      ...formData,
      items: newItems,
      total: calculateTotal(newItems)
    });
  };

  const handleOrderItemChange = (id: string, field: keyof typeof formData.items[0], value: string | number) => {
    const newItems = serviceItemChange(formData.items, id, field, value);
    
    setFormData({
      ...formData,
      items: newItems,
      total: calculateTotal(newItems)
    });
  };

  const handleServiceSelect = (id: string, serviceName: string) => {
    selectService(formData.items, id, serviceName, handleOrderItemChange);
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
    handleAddItem: handleAddOrderItem,
    handleRemoveItem: handleRemoveOrderItem,
    handleItemChange: handleOrderItemChange,
    handleServiceSelect,
    handleClientSelect,
    handleSubmit,
    setFormData,
  };
};
