import { apiClient } from './api-client';
import { API_CONSTANT } from '$f3/constant/api-constant';
import { cookieService } from '$lib/services/storage/browser-cookie';


// Mỗi request được gửi lên sẽ qua cái này
apiClient.interceptors.request.use((config) => {

  // Bước 1: Thiết lập headers mặc định
  if (config.headers) {
    config.headers[API_CONSTANT.AUTHENTICATION.HEADER.NAME.ContentType] = API_CONSTANT.AUTHENTICATION.HEADER.VALUE.ApplicationJson;
  }
  
  // Phương thức 1: Sử dụng cookie để lấy token
  const tokenFromCookie = cookieService.get(API_CONSTANT.COOKIE.NAME.Token);
  
  // Phương thức 2: Sử dụng localStorage để lấy token
  // const tokenFromStorage = localStorage.getItem(API_CONSTANT.COOKIE.NAME.Token);
  
  // Phương thức 3: Sử dụng auth store (đã comment)
  // const user = get(authStore);
  // const tokenFromStore = user?.token;
  
  // Ưu tiên sử dụng token theo thứ tự: cookie > localStorage > store
  const token = tokenFromCookie;
  if (token && config.headers) {
    // Nếu dùng BE JWT
    // config.headers.Authorization = `${API_CONSTANT.authentication.header.prefix.Bearer}${token}`;
    // Nếu BE dùng Redis only thì
    config.headers[API_CONSTANT.AUTHENTICATION.HEADER.NAME.Authorization] = token;
  }
  
  return config;
});

// Xử lý lỗi và các trường hợp đặc biệt
apiClient.interceptors.response.use(
  (response) => {
    
    // Nếu có logic thì xử lý thêm

    return response;
  },
  (error) => {
    // Xử lý lỗi 401 - Unauthorized
    if (error.response?.status === API_CONSTANT.ERROR.CODE.Unauthorized) {
      console.warn('Unauthorized - cần đăng nhập lại');
      
      // Xóa token khỏi cả cookie và localStorage
      cookieService.remove(API_CONSTANT.COOKIE.NAME.Token);
      // localStorage.removeItem(API_CONSTANT.authentication.tokenName);
      
      // Chuyển hướng đến trang đăng nhập hoặc reset authStore nếu cần
      // window.location.href = '/login';
      // authStore.set(null);
    }
    
    // Xử lý các mã lỗi khác tại đây
    if (error.response?.status === API_CONSTANT.ERROR.CODE.Forbidden) {
      console.warn('Forbidden - không có quyền truy cập');
    }
    
    if (error.response?.status === API_CONSTANT.ERROR.CODE.SystemError) {
      console.error('Server error - lỗi máy chủ');
    }
    
    return Promise.reject(error);
  }
);