/**
 * Action để phát hiện click bên ngoài một element
 * @param node - Element DOM cần theo dõi
 * @param callbackFunction - Hàm callback được gọi khi có click bên ngoài
 */
export function clickOutside(node: HTMLElement, callbackFunction: () => void) {
    function onClick(event: MouseEvent) {
      const target = event.target as Node;
      if (!node.contains(target)) {
        callbackFunction();
      }
    }
  
    document.addEventListener('click', onClick, true);
  
    return {
      destroy() {
        document.removeEventListener('click', onClick, true);
      },
      update(newCallbackFunction: () => void) {
        callbackFunction = newCallbackFunction;
      }
    };
  }