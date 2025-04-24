// Interface cho thông tin người dùng
export interface UserInfo {
  token: string;
  phone: string;
  username: string;
  fullName?: string;
  refreshToken?: string;
}