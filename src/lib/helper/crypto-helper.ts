/**
 * Helper class để mã hóa và giải mã dữ liệu
 */
export class CryptoHelper {
    private static SECRET_KEY = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    /**
     * Mã hóa dữ liệu trước khi lưu vào cookie
     * @param data Dữ liệu cần mã hóa
     * @returns Chuỗi đã được mã hóa
     */
    static encrypt(data: string): string {
      try {
        // Simple encoding with Base64 (for basic obfuscation)
        // Note: This is NOT secure encryption, just basic obfuscation
        const encodedData = btoa(encodeURIComponent(data));
        
        // Add some simple transformation for additional obfuscation
        return encodedData
          .split('')
          .map(char => String.fromCharCode(char.charCodeAt(0) + 1))
          .join('');
      } catch (error) {
        console.error('Lỗi khi mã hóa dữ liệu:', error);
        return '';
      }
    }
  
    /**
     * Giải mã dữ liệu từ cookie
     * @param encryptedData Dữ liệu đã được mã hóa
     * @returns Dữ liệu gốc sau khi giải mã
     */
    static decrypt(encryptedData: string): string {
      try {
        // Reverse the transformation
        const base64Data = encryptedData
          .split('')
          .map(char => String.fromCharCode(char.charCodeAt(0) - 1))
          .join('');
        
        // Decode from Base64
        return decodeURIComponent(atob(base64Data));
      } catch (error) {
        console.error('Lỗi khi giải mã dữ liệu:', error);
        return '';
      }
    }
  
    /**
     * Mã hóa một object thành chuỗi và mã hóa
     * @param obj Object cần mã hóa
     * @returns Chuỗi đã được mã hóa
     */
    static encryptObject<T>(obj: T): string {
      try {
        const jsonString = JSON.stringify(obj);
        return this.encrypt(jsonString);
      } catch (error) {
        console.error('Lỗi khi mã hóa object:', error);
        return '';
      }
    }
  
    /**
     * Giải mã chuỗi và chuyển thành object
     * @param encryptedData Chuỗi đã được mã hóa
     * @returns Object sau khi giải mã
     */
    static decryptObject<T>(encryptedData: string): T | null {
      try {
        const jsonString = this.decrypt(encryptedData);
        return JSON.parse(jsonString) as T;
      } catch (error) {
        console.error('Lỗi khi giải mã thành object:', error);
        return null;
      }
    }
  }
  
  // Export instance để sử dụng
  export const cryptoHelper = CryptoHelper;