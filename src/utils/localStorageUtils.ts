
/**
 * Utility functions for working with local storage
 */

// Save data to local storage
export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error(`Error saving data to localStorage (${key}):`, error);
  }
};

// Load data from local storage
export const loadFromLocalStorage = <T>(key: string): T | null => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData) as T;
  } catch (error) {
    console.error(`Error loading data from localStorage (${key}):`, error);
    return null;
  }
};

// Storage keys
export const STORAGE_KEYS = {
  ORDERS: 'web_studio_crm_orders',
  CLIENTS: 'web_studio_crm_clients',
};
