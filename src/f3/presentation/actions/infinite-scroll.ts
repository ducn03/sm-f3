interface InfiniteScrollOptions {
    threshold?: number;
    horizontal?: boolean;
  }
  
  /**
   * Action tạo infinite scrolling
   * @param node - Element DOM cần theo dõi scroll
   * @param options - Tùy chọn cấu hình (threshold, horizontal)
   */
  export function infiniteScroll(
    node: HTMLElement,
    options: { callback: () => void; options?: InfiniteScrollOptions }
  ) {
    const { callback, options: scrollOptions } = options;
    const threshold = scrollOptions?.threshold || 100;
    const horizontal = scrollOptions?.horizontal || false;
  
    function handleScroll() {
      const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = node;
      
      if (horizontal) {
        const rightEdgePosition = scrollLeft + clientWidth;
        const isNearRightEdge = scrollWidth - rightEdgePosition < threshold;
        
        if (isNearRightEdge) {
          callback();
        }
      } else {
        const bottomPosition = scrollTop + clientHeight;
        const isNearBottom = scrollHeight - bottomPosition < threshold;
        
        if (isNearBottom) {
          callback();
        }
      }
    }
  
    node.addEventListener('scroll', handleScroll);
  
    return {
      destroy() {
        node.removeEventListener('scroll', handleScroll);
      },
      update(newOptions: { callback: () => void; options?: InfiniteScrollOptions }) {
        options = newOptions;
      }
    };
  }