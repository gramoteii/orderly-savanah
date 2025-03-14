
import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { Order, OrderStatus, initialOrders } from '../data/orders';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  filteredOrders: Order[];
  searchTerm: string;
  statusFilter: OrderStatus | 'all';
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrder: (order: Order) => void;
  deleteOrder: (id: string) => void;
  setCurrentOrder: (order: Order | null) => void;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: OrderStatus | 'all') => void;
  setEditModalOpen: (open: boolean) => void;
  setDeleteModalOpen: (open: boolean) => void;
  filterOrders: () => void;
  getOrderById: (id: string) => Order | undefined;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: initialOrders,
  currentOrder: null,
  filteredOrders: initialOrders,
  searchTerm: '',
  statusFilter: 'all',
  isEditModalOpen: false,
  isDeleteModalOpen: false,

  addOrder: (order) => {
    const newOrder: Order = {
      ...order,
      id: nanoid()
    };
    set((state) => ({ 
      orders: [...state.orders, newOrder] 
    }));
    get().filterOrders();
  },

  updateOrder: (updatedOrder) => {
    set((state) => ({
      orders: state.orders.map((order) => 
        order.id === updatedOrder.id ? updatedOrder : order
      )
    }));
    get().filterOrders();
  },

  deleteOrder: (id) => {
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== id),
      currentOrder: state.currentOrder?.id === id ? null : state.currentOrder
    }));
    get().filterOrders();
  },

  setCurrentOrder: (order) => {
    set({ currentOrder: order });
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterOrders();
  },

  setStatusFilter: (status) => {
    set({ statusFilter: status });
    get().filterOrders();
  },

  setEditModalOpen: (open) => {
    set({ isEditModalOpen: open });
  },

  setDeleteModalOpen: (open) => {
    set({ isDeleteModalOpen: open });
  },

  filterOrders: () => {
    const { orders, searchTerm, statusFilter } = get();
    
    const filtered = orders.filter((order) => {
      const matchesSearch = 
        searchTerm === '' || 
        order.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'all' || 
        order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
    
    set({ filteredOrders: filtered });
  },

  getOrderById: (id) => {
    return get().orders.find((order) => order.id === id);
  }
}));
