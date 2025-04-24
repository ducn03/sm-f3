/**
 * Helper class để xử lý chuyển đổi giữa JSON và Object
 */
export class JsonHelper {
    /**
     * Chuyển đổi object sang chuỗi JSON
     * @param obj Object cần chuyển đổi
     * @param prettify Định dạng JSON đẹp với các tab và xuống dòng
     * @returns Chuỗi JSON
     */
    static toJson<T>(obj: T, prettify: boolean = false): string {
      try {
        return prettify 
          ? JSON.stringify(obj, null, 2) 
          : JSON.stringify(obj);
      } catch (error) {
        console.error('Lỗi khi chuyển đổi object sang JSON:', error);
        return '';
      }
    }
  
    /**
     * Chuyển đổi chuỗi JSON sang object
     * @param jsonString Chuỗi JSON cần chuyển đổi
     * @returns Object được chuyển đổi từ JSON
     */
    static toObject<T>(jsonString: string): T | null {
      try {
        return JSON.parse(jsonString) as T;
      } catch (error) {
        console.error('Lỗi khi chuyển đổi JSON sang object:', error);
        return null;
      }
    }
  
    /**
     * Kiểm tra chuỗi có phải là JSON hợp lệ không
     * @param jsonString Chuỗi cần kiểm tra
     * @returns true nếu là JSON hợp lệ, false nếu không phải
     */
    static isValidJson(jsonString: string): boolean {
      try {
        JSON.parse(jsonString);
        return true;
      } catch (error) {
        return false;
      }
    }
  
    /**
     * Clone sâu một object bằng cách chuyển đổi qua JSON
     * @param obj Object cần clone
     * @returns Object mới được clone sâu
     */
    static deepClone<T>(obj: T): T | null {
      try {
        return JSON.parse(JSON.stringify(obj)) as T;
      } catch (error) {
        console.error('Lỗi khi clone object:', error);
        return null;
      }
    }
  }
  
  // Export instance để sử dụng
  export const jsonHelper = JsonHelper;