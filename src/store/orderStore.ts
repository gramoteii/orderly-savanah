
import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { Order, OrderStatus, initialOrders } from '../data/orders';
import { saveToLocalStorage, loadFromLocalStorage, STORAGE_KEYS } from '../utils/localStorageUtils';

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
  exportDataToJson: () => string;
  importDataFromJson: (jsonData: string) => void;
}

// Load orders from localStorage or use initial data
const getSavedOrders = (): Order[] => {
  const savedOrders = loadFromLocalStorage<Order[]>(STORAGE_KEYS.ORDERS);
  return savedOrders || initialOrders;
};

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: getSavedOrders(),
  currentOrder: null,
  filteredOrders: getSavedOrders(),
  searchTerm: '',
  statusFilter: 'all',
  isEditModalOpen: false,
  isDeleteModalOpen: false,

  addOrder: (order) => {
    const newOrder: Order = {
      ...order,
      id: nanoid()
    };
    set((state) => {
      const updatedOrders = [...state.orders, newOrder];
      saveToLocalStorage(STORAGE_KEYS.ORDERS, updatedOrders);
      return { orders: updatedOrders };
    });
    get().filterOrders();
  },

  updateOrder: (updatedOrder) => {
    set((state) => {
      const updatedOrders = state.orders.map((order) => 
        order.id === updatedOrder.id ? updatedOrder : order
      );
      saveToLocalStorage(STORAGE_KEYS.ORDERS, updatedOrders);
      return { orders: updatedOrders };
    });
    get().filterOrders();
  },

  deleteOrder: (id) => {
    set((state) => {
      const updatedOrders = state.orders.filter((order) => order.id !== id);
      saveToLocalStorage(STORAGE_KEYS.ORDERS, updatedOrders);
      return {
        orders: updatedOrders,
        currentOrder: state.currentOrder?.id === id ? null : state.currentOrder
      };
    });
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
  },

  exportDataToJson: () => {
    return JSON.stringify(get().orders, null, 2);
  },

  importDataFromJson: (jsonData) => {
    try {
      const parsedData = JSON.parse(jsonData) as Order[];
      set({ orders: parsedData });
      saveToLocalStorage(STORAGE_KEYS.ORDERS, parsedData);
      get().filterOrders();
    } catch (error) {
      console.error('Error importing data:', error);
      throw new Error('Invalid JSON format');
    }
  }
}));
