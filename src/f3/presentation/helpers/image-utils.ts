/**
 * Tạo URL cho placeholder image
 * @param width - Chiều rộng
 * @param height - Chiều cao
 * @param text - Text hiển thị trên placeholder
 * @returns URL của placeholder image
 */
export function getPlaceholderImage(
    width: number = 400,
    height: number = 300,
    text: string = 'Image'
  ): string {
    return `https://via.placeholder.com/${width}x${height}?text=${encodeURIComponent(text)}`;
  }
  
  /**
   * Lấy kích thước thực của một hình ảnh
   * @param src - Source URL của image
   * @returns Promise với dimensions của image
   */
  export function getImageDimensions(src: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight
        });
      };
      img.onerror = (err) => {
        reject(new Error('Failed to load image'));
      };
      img.src = src;
    });
  }
  
  /**
   * Resize image và trả về dưới dạng data URL
   * @param file - File hình ảnh cần resize
   * @param maxWidth - Chiều rộng tối đa
   * @param maxHeight - Chiều cao tối đa
   * @param quality - Chất lượng hình ảnh (0-1)
   * @returns Promise với data URL của hình ảnh đã resize
   */
  export function resizeImage(
    file: File,
    maxWidth: number = 800,
    maxHeight: number = 600,
    quality: number = 0.8
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      // Tạo FileReader để đọc file
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        // Tạo image từ file
        const img = new Image();
        img.onload = () => {
          // Tính toán kích thước mới
          let width = img.width;
          let height = img.height;
          
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
          
          // Tạo canvas để vẽ hình ảnh
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
          }
          
          // Vẽ hình ảnh lên canvas
          ctx.drawImage(img, 0, 0, width, height);
          
          // Chuyển canvas thành data URL
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        };
        
        img.onerror = () => {
          reject(new Error('Failed to create image'));
        };
        
        if (typeof readerEvent.target?.result === 'string') {
          img.src = readerEvent.target.result;
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsDataURL(file);
    });
  }
  
  /**
   * Chuyển đổi data URL thành File object
   * @param dataUrl - Data URL cần chuyển đổi
   * @param filename - Tên file
   * @param mimeType - Loại MIME
   * @returns File object
   */
  export function dataUrlToFile(
    dataUrl: string,
    filename: string,
    mimeType: string = 'image/jpeg'
  ): File {
    // Trích xuất data từ data URL
    const arr = dataUrl.split(',');
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, { type: mimeType });
  }
  
  /**
   * Lấy orientation của EXIF metadata từ image
   * @param file - File hình ảnh
   * @returns Promise với orientation (1-8) hoặc null nếu không có
   */
  export function getImageOrientation(file: File): Promise<number | null> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target || !e.target.result) {
          resolve(null);
          return;
        }
        
        const view = new DataView(e.target.result as ArrayBuffer);
        
        if (view.getUint16(0, false) !== 0xFFD8) {
          // Not a JPEG
          resolve(null);
          return;
        }
        
        const length = view.byteLength;
        let offset = 2;
        
        while (offset < length) {
          if (view.getUint16(offset + 2, false) <= 8) break;
          const marker = view.getUint16(offset, false);
          offset += 2;
          
          if (marker === 0xFFE1) {
            if (view.getUint32(offset += 2, false) !== 0x45786966) {
              // Not an EXIF header
              break;
            }
            
            const little = view.getUint16(offset += 6, false) === 0x4949;
            offset += view.getUint32(offset + 4, little);
            const tags = view.getUint16(offset, little);
            offset += 2;
            
            for (let i = 0; i < tags; i++) {
              if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                // Orientation tag
                resolve(view.getUint16(offset + (i * 12) + 8, little));
                return;
              }
            }
          } else if ((marker & 0xFF00) !== 0xFF00) {
            break;
          } else {
            offset += view.getUint16(offset, false);
          }
        }
        
        resolve(null);
      };
      
      reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
    });
  }