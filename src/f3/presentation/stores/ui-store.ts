import { writable } from 'svelte/store';

export interface UIState {
  darkMode: boolean;
  sidebarOpen: boolean;
  currentRoute: string;
  notifications: Notification[];
}

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  duration?: number;
}

const initialState: UIState = {
  darkMode: false,
  sidebarOpen: true,
  currentRoute: '/',
  notifications: []
};

function createUIStore() {
  const { subscribe, set, update } = writable<UIState>(initialState);

  // Khởi tạo store từ localStorage nếu có
  function initialize() {
    try {
      const savedDarkMode = localStorage.getItem('darkMode');
      const savedSidebarOpen = localStorage.getItem('sidebarOpen');
      
      update(state => ({
        ...state,
        darkMode: savedDarkMode ? JSON.parse(savedDarkMode) : state.darkMode,
        sidebarOpen: savedSidebarOpen ? JSON.parse(savedSidebarOpen) : state.sidebarOpen
      }));
    } catch (error) {
      console.error('Error initializing UI store:', error);
    }
  }

  return {
    subscribe,
    
    toggleDarkMode: () => {
      update(state => {
        const newDarkMode = !state.darkMode;
        localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
        return { ...state, darkMode: newDarkMode };
      });
    },
    
    toggleSidebar: () => {
      update(state => {
        const newSidebarOpen = !state.sidebarOpen;
        localStorage.setItem('sidebarOpen', JSON.stringify(newSidebarOpen));
        return { ...state, sidebarOpen: newSidebarOpen };
      });
    },
    
    setCurrentRoute: (route: string) => {
      update(state => ({ ...state, currentRoute: route }));
    },
    
    addNotification: (notification: Omit<Notification, 'id'>) => {
      const id = Date.now().toString();
      const newNotification = { ...notification, id };
      
      update(state => ({
        ...state,
        notifications: [...state.notifications, newNotification]
      }));
      
      // Auto-remove notification after duration
      if (notification.duration) {
        setTimeout(() => {
          update(state => ({
            ...state,
            notifications: state.notifications.filter(n => n.id !== id)
          }));
        }, notification.duration);
      }
      
      return id;
    },
    
    removeNotification: (id: string) => {
      update(state => ({
        ...state,
        notifications: state.notifications.filter(n => n.id !== id)
      }));
    },
    
    clearNotifications: () => {
      update(state => ({ ...state, notifications: [] }));
    },
    
    initialize
  };
}

export const uiStore = createUIStore();