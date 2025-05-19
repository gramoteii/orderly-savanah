
import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { clientsData } from '../data/clients';
import { saveToLocalStorage, loadFromLocalStorage, STORAGE_KEYS } from '../utils/localStorageUtils';

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
  exportDataToJson: () => string;
  importDataFromJson: (jsonData: string) => void;
}

// Load clients from localStorage or use initial data
const getSavedClients = (): Client[] => {
  const savedClients = loadFromLocalStorage<Client[]>(STORAGE_KEYS.CLIENTS);
  return savedClients || clientsData;
};

export const useClientStore = create<ClientState>((set, get) => ({
  clients: getSavedClients(),
  filteredClients: getSavedClients(),
  currentClient: null,
  searchTerm: '',
  isModalOpen: false,

  addClient: (client) => {
    const newClient: Client = {
      ...client,
      id: nanoid(),
      orders: 0
    };
    set((state) => {
      const updatedClients = [...state.clients, newClient];
      saveToLocalStorage(STORAGE_KEYS.CLIENTS, updatedClients);
      return { clients: updatedClients };
    });
    get().filterClients();
  },

  updateClient: (updatedClient) => {
    set((state) => {
      const updatedClients = state.clients.map((client) => 
        client.id === updatedClient.id ? updatedClient : client
      );
      saveToLocalStorage(STORAGE_KEYS.CLIENTS, updatedClients);
      return { clients: updatedClients };
    });
    get().filterClients();
  },

  deleteClient: (id) => {
    set((state) => {
      const updatedClients = state.clients.filter((client) => client.id !== id);
      saveToLocalStorage(STORAGE_KEYS.CLIENTS, updatedClients);
      return {
        clients: updatedClients,
        currentClient: state.currentClient?.id === id ? null : state.currentClient
      };
    });
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
    set((state) => {
      const updatedClients = state.clients.map(client => 
        client.id === id 
          ? { ...client, orders: client.orders + 1 } 
          : client
      );
      saveToLocalStorage(STORAGE_KEYS.CLIENTS, updatedClients);
      return { clients: updatedClients };
    });
  },
  
  decrementClientOrders: (id) => {
    set((state) => {
      const updatedClients = state.clients.map(client => 
        client.id === id && client.orders > 0
          ? { ...client, orders: client.orders - 1 } 
          : client
      );
      saveToLocalStorage(STORAGE_KEYS.CLIENTS, updatedClients);
      return { clients: updatedClients };
    });
  },

  exportDataToJson: () => {
    return JSON.stringify(get().clients, null, 2);
  },

  importDataFromJson: (jsonData) => {
    try {
      const parsedData = JSON.parse(jsonData) as Client[];
      set({ clients: parsedData });
      saveToLocalStorage(STORAGE_KEYS.CLIENTS, parsedData);
      get().filterClients();
    } catch (error) {
      console.error('Error importing data:', error);
      throw new Error('Invalid JSON format');
    }
  }
}));
