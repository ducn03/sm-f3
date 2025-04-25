// API
import { apiHelper, apiClient } from '$f3/api/api-client';
import { ENDPOINTS } from '$f3/routes/endpoints';
import { API_CONSTANT } from '$f3/constant/api-constant';
// SERVICE
import { cookieService } from '$lib/services/storage/browser-cookie';
import { authStore } from '$f3/services/auth/stores/auth-store';
// HELPER
import { cryptoHelper } from '$lib/helper/crypto-helper';
// INTERFACE
import type { CookieOptions } from '$lib/services/storage/interface/cookie-options';
import type { UserInfo } from '$lib/interface/user-info';
import type { LoginCredentials } from '$f3/services/auth/interface/login-credentials';
// import { authStore } from '$presentation/stores/auth-store';

const tokenName = API_CONSTANT.COOKIE.KEY.Token;
const refreshToken = API_CONSTANT.COOKIE.KEY.RefreshToken;

/**
 * Dịch vụ xử lý các thao tác liên quan đến xác thực
 */
export class AuthService {
  /**
   * Đăng nhập vào hệ thống
   * @param credentials Thông tin đăng nhập
   * @returns Dữ liệu trả về khi đăng nhập thành công
   */
  static async login(credentials: LoginCredentials): Promise<UserInfo> {
      const { username, password, rememberMe = false } = credentials;
      
      // B1: Gọi API đăng nhập
      const response = await apiHelper.post<UserInfo>(
        apiClient,
        ENDPOINTS.login, 
        { username, password }
      );
      
      //B2: Xử lý kết quả sau khi gọi API đăng nhập

      if (!response || response.token) {
        console.log("Không có token trả về")
        return response;
      }

      // Luôn lưu vào cookie cho phiên hiện tại
      const cookieOptions : CookieOptions = {
        path: '/',
        secure: window.location.protocol === 'http:',
        sameSite: 'Lax' as const
      };
      
      cookieService.set(tokenName, cryptoHelper.encryptObject(response), cookieOptions);
      if (response.refreshToken != null){
        cookieService.set(refreshToken, cryptoHelper.encrypt(response?.refreshToken));
      }
      authStore.setAuth(response.token, response);
        
      return response;
  }
  
  /**
   * Đăng xuất khỏi hệ thống
   */
  static async logout(): Promise<void> {
    const response = await apiHelper.post(apiClient, ENDPOINTS.logout)

    if(response == false){
      console.log("Đăng xuất thất bại");
      return;
    }

    cookieService.remove(tokenName);
    authStore.clearAuth();
    // window.location.href = '/login';
  }
  
  /**
   * Kiểm tra người dùng đã đăng nhập hay chưa
   * @returns true nếu đã đăng nhập, false nếu chưa
   */
  static isAuthenticated(): boolean {
    const token = cookieService.get(tokenName);
    
    return !!token;
  }
  
  /**
   * Lấy thông tin người dùng hiện tại
   * @returns Thông tin người dùng hoặc null nếu chưa đăng nhập
   */
  static getCurrentUser(): UserInfo | null {
    const token = getToken();
    if (token == null) return null;
    return cryptoHelper.decryptObject<UserInfo>(token);
  }
  
  /**
   * Lấy token hiện tại
   * @returns Token hiện tại hoặc null nếu chưa đăng nhập
   */
  static getToken(): string | null {
    return cookieService.get(tokenName);
  }
  
  /**
   * Cập nhật thông tin người dùng từ server
   * @returns Thông tin người dùng đã cập nhật
   */
  static async refreshUserInfo(): Promise<UserInfo> {
    const userInfo = await apiHelper.get<UserInfo>(
        apiClient,
        ENDPOINTS.getUserInfo
      );
      
      // Cập nhật vào localStorage
      // localStorageService.set(API_CONSTANT.authentication.userInfoName, userInfo);
      
      // Cập nhật vào authStore nếu đang sử dụng
      // const auth = get(authStore);
      // if (auth) {
      //   authStore.set({
      //     ...auth,
      //     user: userInfo
      //   });
      // }
      
    return userInfo;
  }
}

// Export các hàm tiện ích để dễ sử dụng
export const login = AuthService.login;
export const logout = AuthService.logout;
export const isAuthenticated = AuthService.isAuthenticated;
export const getCurrentUser = AuthService.getCurrentUser;
export const getToken = AuthService.getToken;
export const refreshUserInfo = AuthService.refreshUserInfo;