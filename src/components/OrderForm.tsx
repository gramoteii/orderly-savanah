
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Order } from '../data/orders';
import { useOrderStore } from '../store/orderStore';
import { useClientStore } from '../store/clientStore';
import { useToast } from '@/hooks/use-toast';

// Import new component files
import OrderFormHeader from './form/OrderFormHeader';
import OrderBasicInfoSection from './form/OrderBasicInfoSection';
import CustomerSection from './form/CustomerSection';
import ServicesSection from './form/ServicesSection';
import CommentsSection from './form/CommentsSection';
import { useOrderForm, webStudioServices } from '../hooks/useOrderForm';

const OrderForm: React.FC = () => {
  const { toast } = useToast();
  const { 
    currentOrder, 
    isEditModalOpen, 
    setEditModalOpen, 
    addOrder, 
    updateOrder 
  } = useOrderStore();
  
  const { clients } = useClientStore();

  const handleSave = (formData: Omit<Order, 'id'>) => {
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

  const {
    formData,
    selectedClientId,
    handleAddItem,
    handleRemoveItem,
    handleItemChange,
    handleServiceSelect,
    handleClientSelect,
    handleSubmit,
    setFormData,
  } = useOrderForm(currentOrder, isEditModalOpen, handleSave, () => setEditModalOpen(false));

  return (
    <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
        <OrderFormHeader isEditing={!!currentOrder} />
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <OrderBasicInfoSection 
            number={formData.number}
            date={formData.date}
            status={formData.status}
            onNumberChange={(value) => setFormData({ ...formData, number: value })}
            onDateChange={(value) => setFormData({ ...formData, date: value })}
            onStatusChange={(value) => setFormData({ ...formData, status: value })}
          />

          <CustomerSection 
            clients={clients}
            selectedClientId={selectedClientId}
            customer={formData.customer}
            onClientSelect={handleClientSelect}
          />

          <ServicesSection 
            items={formData.items}
            total={formData.total}
            serviceOptions={webStudioServices}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onItemChange={handleItemChange}
            onServiceSelect={handleServiceSelect}
          />

          <CommentsSection 
            comments={formData.comments || ''}
            onCommentsChange={(value) => setFormData({ ...formData, comments: value })}
          />

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
