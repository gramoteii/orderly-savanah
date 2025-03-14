
import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { clientsData } from '../data/clients';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  company?: string;
  position?: string;
  website?: string;
  source?: string;
}

interface ClientState {
  clients: Client[];
  filteredClients: Client[];
  currentClient: Client | null;
  searchTerm: string;
  isModalOpen: boolean;
  addClient: (client: Omit<Client, 'id' | 'orders'>) => void;
  updateClient: (client: Client) => void;
  deleteClient: (id: string) => void;
  setCurrentClient: (client: Client | null) => void;
  setSearchTerm: (term: string) => void;
  setModalOpen: (open: boolean) => void;
  filterClients: () => void;
  getClientById: (id: string) => Client | undefined;
  incrementClientOrders: (id: string) => void;
  decrementClientOrders: (id: string) => void;
}

export const useClientStore = create<ClientState>((set, get) => ({
  clients: clientsData,
  filteredClients: clientsData,
  currentClient: null,
  searchTerm: '',
  isModalOpen: false,

  addClient: (client) => {
    const newClient: Client = {
      ...client,
      id: nanoid(),
      orders: 0
    };
    set((state) => ({ 
      clients: [...state.clients, newClient] 
    }));
    get().filterClients();
  },

  updateClient: (updatedClient) => {
    set((state) => ({
      clients: state.clients.map((client) => 
        client.id === updatedClient.id ? updatedClient : client
      )
    }));
    get().filterClients();
  },

  deleteClient: (id) => {
    set((state) => ({
      clients: state.clients.filter((client) => client.id !== id),
      currentClient: state.currentClient?.id === id ? null : state.currentClient
    }));
    get().filterClients();
  },

  setCurrentClient: (client) => {
    set({ currentClient: client });
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterClients();
  },

  setModalOpen: (open) => {
    set({ isModalOpen: open });
  },

  filterClients: () => {
    const { clients, searchTerm } = get();
    
    const filtered = clients.filter((client) => {
      const matchesSearch = 
        searchTerm === '' || 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm) ||
        (client.company && client.company.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesSearch;
    });
    
    set({ filteredClients: filtered });
  },

  getClientById: (id) => {
    return get().clients.find((client) => client.id === id);
  },
  
  incrementClientOrders: (id) => {
    set((state) => ({
      clients: state.clients.map(client => 
        client.id === id 
          ? { ...client, orders: client.orders + 1 } 
          : client
      )
    }));
  },
  
  decrementClientOrders: (id) => {
    set((state) => ({
      clients: state.clients.map(client => 
        client.id === id && client.orders > 0
          ? { ...client, orders: client.orders - 1 } 
          : client
      )
    }));
  }
}));
