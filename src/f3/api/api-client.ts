// lib/api/api-client.js
import axios, { type AxiosInstance } from 'axios';
import { setupInterceptors } from './api-interceptors';

// Tạo và trả về một instance Axios với cấu hình cơ bản
export const createInstance = (): AxiosInstance => {
  return axios.create({
    withCredentials: false
  });
};

// Instance API mặc định để sử dụng trong ứng dụng
export const apiClient = createInstance();

// Thiết lập interceptors cho instance (gọi hàm từ file api-interceptors)
setupInterceptors(apiClient);

// Các helper function để tương tác với API (sử dụng instance có interceptors)
export const apiHelper = {
  get: async <T>(url: string, params?: any, customInstance?: AxiosInstance): Promise<T> => {
    const instance = customInstance || apiClient;
    const res = await instance.get(url, { params });
    return res.data;
  },

  post: async <T>(url: string, body?: any, customInstance?: AxiosInstance): Promise<T> => {
    const instance = customInstance || apiClient;
    const res = await instance.post(url, body);
    return res.data;
  },

  put: async <T>(url: string, body?: any, customInstance?: AxiosInstance): Promise<T> => {
    const instance = customInstance || apiClient;
    const res = await instance.put(url, body);
    return res.data;
  },

  delete: async <T>(url: string, params?: any, customInstance?: AxiosInstance): Promise<T> => {
    const instance = customInstance || apiClient;
    const res = await instance.delete(url, { params });
    return res.data;
  }
};