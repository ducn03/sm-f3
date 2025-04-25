import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
// SERVICE
import { cookieService } from '$lib/services/storage/browser-cookie';
// CONSTANT
import { API_CONSTANT } from '$f3/constant/api-constant';
// HELPER
import { cryptoHelper } from '$lib/helper/crypto-helper';
// INTERFACE
import type { UserInfo } from '$lib/interface/user-info';


// Interface cho trạng thái xác thực
export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userInfo: UserInfo | null;
  loading: boolean;
}

// Trạng thái ban đầu
const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  userInfo: null,
  loading: true
};

const tokenName = API_CONSTANT.COOKIE.KEY.Token;

// Hàm khởi tạo trạng thái từ dữ liệu đã lưu trữ
function initializeState(): AuthState {
  const token = cookieService.get(tokenName);
  let userInfo = null;
  if (token != null){
    userInfo = cryptoHelper.decryptObject<UserInfo>(token);
  }
  
  return {
    isAuthenticated: !!token,
    token,
    userInfo,
    loading: false
  };
}

// Tạo custom store
function createAuthStore() {
  // Tạo writable store với trạng thái ban đầu
  const { subscribe, set, update }: Writable<AuthState> = writable(initialState);

  // Khởi tạo từ dữ liệu đã lưu
  if (typeof window !== 'undefined') {
    set(initializeState());
  }
  
  return {
    subscribe,
    
    // Đặt trạng thái xác thực
    setAuth: (token: string, userInfo: UserInfo) => {
      update(state => ({
        ...state,
        isAuthenticated: true,
        token,
        userInfo,
        loading: false
      }));
    },
    
    // Xóa trạng thái xác thực (đăng xuất)
    clearAuth: () => {
      update(state => ({
        ...state,
        isAuthenticated: false,
        token: null,
        userInfo: null,
        loading: false
      }));
    },
    
    // Cập nhật thông tin người dùng
    updateUser: (userInfo: UserInfo) => {
      update(state => ({
        ...state,
        userInfo
      }));
    },
    
    // Đặt trạng thái loading
    setLoading: (loading: boolean) => {
      update(state => ({
        ...state,
        loading
      }));
    }
  };
}

// Export store để sử dụng trong ứng dụng
export const authStore = createAuthStore();