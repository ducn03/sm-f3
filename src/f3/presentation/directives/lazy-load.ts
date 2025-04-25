/**
 * Directive cho lazy loading của images
 * @param node - Image element cần lazy load
 * @param src - Source URL của image
 */
export function lazyLoad(node: HTMLImageElement, src: string) {
    let observer: IntersectionObserver;
    
    function loadImage() {
      if (!src) return;
      
      // Tạo placeholder hoặc loading spinner trước khi ảnh được tải
      const placeholder = node.getAttribute('data-placeholder');
      if (placeholder) {
        node.src = placeholder;
      }
      
      // Tạo ảnh tạm để biết khi nào tải xong
      const img = new Image();
      img.src = src;
      
      img.onload = () => {
        node.src = src;
        node.dispatchEvent(new CustomEvent('loaded'));
      };
      
      img.onerror = () => {
        // Sử dụng fallback image nếu có
        const fallback = node.getAttribute('data-fallback');
        if (fallback) {
          node.src = fallback;
        }
        node.dispatchEvent(new CustomEvent('error'));
      };
    }
  
    // Khởi tạo intersection observer
    function setupObserver() {
      observer = new IntersectionObserver(entries => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          loadImage();
          observer.disconnect();
        }
      });
      
      observer.observe(node);
    }
  
    // Kiểm tra hỗ trợ IntersectionObserver
    if ('IntersectionObserver' in window) {
      setupObserver();
    } else {
      // Fallback cho trình duyệt không hỗ trợ
      loadImage();
    }
  
    return {
      update(newSrc: string) {
        if (newSrc !== src) {
          src = newSrc;
          if (observer) {
            observer.disconnect();
          }
          setupObserver();
        }
      },
      destroy() {
        if (observer) {
          observer.disconnect();
        }
      }
    };
  }