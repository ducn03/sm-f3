// Lớp tiện ích để tương tác với localStorage và sessionStorage
export class BrowserStorage {
    private storage: Storage;
  
    constructor(useSessionStorage = false) {
      this.storage = useSessionStorage ? sessionStorage : localStorage;
    }
  
    // Lấy dữ liệu từ storage
    get<T>(key: string, defaultValue: T | null = null): T | null {
      const value = this.storage.getItem(key);
      if (value === null) return defaultValue;
      
      try {
        return JSON.parse(value) as T;
      } catch {
        return value as unknown as T;
      }
    }
  
    // Lưu dữ liệu vào storage
    set(key: string, value: any): void {
      if (value === undefined || value === null) {
        this.storage.removeItem(key);
        return;
      }
  
      const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
      this.storage.setItem(key, stringValue);
    }
  
    // Xóa một item khỏi storage
    remove(key: string): void {
      this.storage.removeItem(key);
    }
  
    // Xóa tất cả dữ liệu trong storage
    clear(): void {
      this.storage.clear();
    }
  }
  
  // Tạo và export các instance
  export const localStorageService = new BrowserStorage();
  export const sessionStorageService = new BrowserStorage(true);