
import { nanoid } from 'nanoid';
import { OrderItem } from '../../data/orders';

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

export const useOrderServices = () => {
  const calculateTotal = (items: OrderItem[]) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleAddItem = (items: OrderItem[]) => {
    return [
      ...items,
      {
        id: nanoid(),
        name: '',
        quantity: 1,
        price: 0
      }
    ];
  };

  const handleRemoveItem = (items: OrderItem[], id: string) => {
    if (items.length <= 1) {
      return items;
    }
    return items.filter(item => item.id !== id);
  };

  const handleItemChange = (items: OrderItem[], id: string, field: keyof OrderItem, value: string | number) => {
    return items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        return updatedItem;
      }
      return item;
    });
  };

  const handleServiceSelect = (items: OrderItem[], id: string, serviceName: string, onItemChange: (id: string, field: keyof OrderItem, value: string | number) => void) => {
    if (serviceName === 'custom') {
      onItemChange(id, 'name', '');
      onItemChange(id, 'price', 0);
      return;
    }

    const service = webStudioServices.find(s => s.name === serviceName);
    if (service) {
      onItemChange(id, 'name', service.name);
      onItemChange(id, 'price', service.defaultPrice);
    }
  };

  return {
    calculateTotal,
    handleAddItem,
    handleRemoveItem,
    handleItemChange,
    handleServiceSelect
  };
};
