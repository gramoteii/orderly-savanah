
import { nanoid } from 'nanoid';
import type { Client } from '../store/clientStore';

// Initial data for clients related to IT/web studio
export const clientsData: Client[] = [
  { 
    id: nanoid(), 
    name: 'Иван Петров', 
    email: 'ivan@example.com', 
    phone: '+7 (999) 123-4567', 
    orders: 3,
    company: 'ООО Инновации',
    position: 'Директор',
    website: 'innovate.ru',
    source: 'Рекомендация'
  },
  { 
    id: nanoid(), 
    name: 'Елена Смирнова', 
    email: 'elena@example.com', 
    phone: '+7 (999) 765-4321', 
    orders: 1,
    company: 'ИП Смирнова',
    position: 'Владелец',
    website: 'elen-shop.ru',
    source: 'Instagram'
  },
  { 
    id: nanoid(), 
    name: 'Алексей Козлов', 
    email: 'alexey@example.com', 
    phone: '+7 (999) 555-7777', 
    orders: 2,
    company: 'Веб Солюшнс',
    position: 'Менеджер проектов',
    website: 'websolutions.ru',
    source: 'Поисковая реклама'
  },
  { 
    id: nanoid(), 
    name: 'Мария Иванова', 
    email: 'maria@example.com', 
    phone: '+7 (999) 888-9999', 
    orders: 1,
    company: 'Старт-ап Идея',
    position: 'CEO',
    website: 'startidea.io',
    source: 'Конференция'
  },
  { 
    id: nanoid(), 
    name: 'Сергей Никитин', 
    email: 'sergey@example.com', 
    phone: '+7 (999) 444-3333', 
    orders: 1,
    company: 'Цифровые Решения',
    position: 'Маркетолог',
    website: 'digsolutions.ru',
    source: 'Сайт компании'
  }
];
