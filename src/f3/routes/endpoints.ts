import { env } from '$lib/config/env' 

export const BFF_API_URL = env.BROWSER_TO_BACKEND;
const APP_API_URL = BFF_API_URL + "/app";

export const ENDPOINTS = {
  login: `${APP_API_URL}/auth/login`,
  logout: `${APP_API_URL}/auth/logout`,
  refreshToken: `${APP_API_URL}/auth/refresh-token`,
  getUserInfo: `${APP_API_URL}/user`,
  
};