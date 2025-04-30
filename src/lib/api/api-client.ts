import axios, { type AxiosInstance } from 'axios';

// Tạo và trả về một instance Axios với cấu hình cơ bản
export const createInstance = (): AxiosInstance => {
  // const instance = axios.create();
  return axios.create({
    withCredentials: false
  });
};

// Instance API mặc định để sử dụng trong ứng dụng
export const apiClient = createInstance();

// Các helper function để tương tác với API
export const apiHelper = {
  get: async <T>(instance: AxiosInstance, url: string, params?: any): Promise<T> => {
    const res = await instance.get(url, { params });
    return res.data;
  },

  post: async <T>(instance: AxiosInstance, url: string, body?: any): Promise<T> => {
    const res = await instance.post(url, body);
    return res.data;
  },

  put: async <T>(instance: AxiosInstance, url: string, body?: any): Promise<T> => {
    const res = await instance.put(url, body);
    return res.data;
  },

  delete: async <T>(instance: AxiosInstance, url: string, params?: any): Promise<T> => {
    const res = await instance.delete(url, { params });
    return res.data;
  }
};