import type { UserInfo } from '$lib/interface/user-info';
// Interface cho response khi đăng nhập thành công
export interface LoginResponse {
  token: string;
  user: UserInfo;
}