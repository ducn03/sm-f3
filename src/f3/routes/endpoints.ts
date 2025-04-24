import { env } from '$lib/config/env' 

export const BFF_API_URL = env.BROWSER_TO_BACKEND;

export const ENDPOINTS = {
  login: `${BFF_API_URL}/auth/login`,
  logout: `${BFF_API_URL}/auth/logout`,
  refreshToken: `${BFF_API_URL}/auth/refresh-token`,
  getUserInfo: `${BFF_API_URL}/user`,
  
};