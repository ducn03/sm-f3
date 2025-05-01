// lib/api/api-interceptors.js
import { type AxiosInstance } from 'axios';
import { API_CONSTANT } from '$f3/constant/api-constant';
import { cookieService } from '$lib/services/storage/browser-cookie';
import { logger } from '$lib/services/logger';

/**
 * Thiết lập tất cả interceptors cho instance Axios
 * @param {AxiosInstance} apiInstance - Instance Axios cần thiết lập interceptors
 */
export const setupInterceptors = (apiInstance: AxiosInstance): void => {
  // Interceptor cho requests
  apiInstance.interceptors.request.use(
    (config) => {

      logger.debug("Request being sent:" + `[${config.method}]` + config.url + "");

      // Bước 1: Thiết lập headers mặc định
      if (config.headers) {
        config.headers[API_CONSTANT.AUTHENTICATION.HEADER.KEY.ContentType] = 
          API_CONSTANT.AUTHENTICATION.HEADER.VALUE.ApplicationJson;
      }
      
      // Phương thức 1: Sử dụng cookie để lấy token
      const tokenFromCookie = cookieService.get(API_CONSTANT.COOKIE.KEY.Token);
      
      // Phương thức 2: Sử dụng localStorage để lấy token
      // const tokenFromStorage = localStorage.getItem(API_CONSTANT.COOKIE.KEY.Token);
      
      // Phương thức 3: Sử dụng auth store (đã comment)
      // const user = get(authStore);
      // const tokenFromStore = user?.token;
      
      // Ưu tiên sử dụng token theo thứ tự: cookie > localStorage > store
      const token = tokenFromCookie;
      if (token && config.headers) {
        // Nếu dùng BE JWT
        // config.headers.Authorization = `${API_CONSTANT.authentication.header.prefix.Bearer}${token}`;
        // Nếu BE dùng Redis only thì
        config.headers[API_CONSTANT.AUTHENTICATION.HEADER.KEY.Authorization] = token;
        logger.debug("Token added to request");
      }
      
      return config;
    },
    (error) => {
      logger.error("Request error:", error);
      return Promise.reject(error);
    }
  );

  // Interceptor cho responses
  apiInstance.interceptors.response.use(
    (response) => {
      // Nếu có logic thì xử lý thêm
      logger.debug(response);
      // logger.trace("response: ", response);
      return response;
    },
    (error) => {
      // Xử lý lỗi 401 - Unauthorized
      if (error.response?.status === API_CONSTANT.STATUS.Unauthorized) {
        console.warn('Unauthorized - cần đăng nhập lại');
        
        // Xóa token khỏi cả cookie và localStorage
        cookieService.remove(API_CONSTANT.COOKIE.KEY.Token);
        // localStorage.removeItem(API_CONSTANT.authentication.tokenName);
        
        // Chuyển hướng đến trang đăng nhập hoặc reset authStore nếu cần
        // window.location.href = '/login';
        // authStore.set(null);
      }
      
      // Xử lý các mã lỗi khác tại đây
      if (error.response?.status === API_CONSTANT.STATUS.Forbidden) {
        console.warn('Forbidden - không có quyền truy cập');
      }
      
      if (error.response?.status === API_CONSTANT.STATUS.SystemError) {
        console.error('Server error - lỗi máy chủ');
      }
      
      return Promise.reject(error);
    }
  );
};