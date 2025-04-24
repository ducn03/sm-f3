import type { CookieOptions } from '$lib/services/storage/interface/cookie-options';

export class CookieStorage {
  // Lấy cookie theo key
  static get(key: string): string | null {
    const name = key + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }

  // Thiết lập cookie với các tùy chọn
  static set(key: string, value: string, options: CookieOptions = {}): void {
    const { 
      path = '/', 
      domain = '', 
      maxAge,
      expires, 
      secure = false, 
      sameSite = 'Lax',
      httpOnly = false
    } = options;
    
    let cookieString = `${key}=${encodeURIComponent(value)}`;
    
    if (path) cookieString += `; path=${path}`;
    if (domain) cookieString += `; domain=${domain}`;
    if (maxAge !== undefined) cookieString += `; max-age=${maxAge}`;
    if (expires) cookieString += `; expires=${expires.toUTCString()}`;
    if (secure) cookieString += '; secure';
    if (sameSite) cookieString += `; samesite=${sameSite}`;
    if (httpOnly) cookieString += '; httponly';
    
    document.cookie = cookieString;
  }

  // Xóa cookie
  static remove(key: string, path = '/', domain = ''): void {
    this.set(key, '', { 
      path, 
      domain, 
      maxAge: -1,
      expires: new Date(0)
    });
  }

  // Kiểm tra xem cookie có tồn tại không
  static exists(key: string): boolean {
    return this.get(key) !== null;
  }
}

// Tạo và export các instance
export const cookieService = CookieStorage;