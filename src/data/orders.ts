
import { nanoid } from 'nanoid';

export type OrderStatus = 'new' | 'processing' | 'completed' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  id: string;
  number: string;
  date: string;
  status: OrderStatus;
  customer: Customer;
  items: OrderItem[];
  total: number;
  comments?: string;
}

// Dummy data for initial state
export const initialOrders: Order[] = [
  {
    id: nanoid(),
    number: 'ORD-001',
    date: '2023-09-15',
    status: 'completed',
    customer: {
      id: nanoid(),
      name: 'Иван Петров',
      email: 'ivan@example.com',
      phone: '+7 (999) 123-4567'
    },
    items: [
      {
        id: nanoid(),
        name: 'Ноутбук HP ProBook',
        quantity: 1,
        price: 75000
      },
      {
        id: nanoid(),
        name: 'Мышь беспроводная',
        quantity: 2,
        price: 1500
      }
    ],
    total: 78000
  },
  {
    id: nanoid(),
    number: 'ORD-002',
    date: '2023-09-18',
    status: 'processing',
    customer: {
      id: nanoid(),
      name: 'Елена Смирнова',
      email: 'elena@example.com',
      phone: '+7 (999) 765-4321'
    },
    items: [
      {
        id: nanoid(),
        name: 'Смартфон Samsung Galaxy',
        quantity: 1,
        price: 45000
      }
    ],
    total: 45000
  },
  {
    id: nanoid(),
    number: 'ORD-003',
    date: '2023-09-20',
    status: 'new',
    customer: {
      id: nanoid(),
      name: 'Алексей Козлов',
      email: 'alexey@example.com',
      phone: '+7 (999) 555-7777'
    },
    items: [
      {
        id: nanoid(),
        name: 'Монитор 27" Dell',
        quantity: 2,
        price: 25000
      },
      {
        id: nanoid(),
        name: 'Клавиатура механическая',
        quantity: 1,
        price: 8000
      }
    ],
    total: 58000
  },
  {
    id: nanoid(),
    number: 'ORD-004',
    date: '2023-09-25',
    status: 'cancelled',
    customer: {
      id: nanoid(),
      name: 'Мария Иванова',
      email: 'maria@example.com',
      phone: '+7 (999) 888-9999'
    },
    items: [
      {
        id: nanoid(),
        name: 'Принтер HP LaserJet',
        quantity: 1,
        price: 15000
      }
    ],
    total: 15000,
    comments: 'Клиент отменил заказ из-за долгой доставки'
  },
  {
    id: nanoid(),
    number: 'ORD-005',
    date: '2023-09-27',
    status: 'new',
    customer: {
      id: nanoid(),
      name: 'Сергей Никитин',
      email: 'sergey@example.com',
      phone: '+7 (999) 444-3333'
    },
    items: [
      {
        id: nanoid(),
        name: 'Наушники Sony WH-1000XM4',
        quantity: 1,
        price: 28000
      }
    ],
    total: 28000
  }
];
