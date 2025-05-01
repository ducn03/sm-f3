type HandleFormOptions = {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: unknown) => void | String;
};

/**
 * Hàm xử lý form chuẩn hóa: dispatch, catch lỗi, loading...
 */
export function handleForm(
  fn: () => Promise<void>,
  options: HandleFormOptions = {}
): void {
  const { onStart, onEnd, onError } = options;

  if (onStart) onStart();

  fn()
    .catch((error: unknown) => {
      if (onError) {
        onError(error);
      } else {
        if (error instanceof Error) {
          (window as any).errorMessage = error.message; // fallback nếu không có state
        } else {
          (window as any).errorMessage = "Lỗi kết nối. Vui lòng thử lại sau.";
        }
      }
    })
    .finally(() => {
      if (onEnd) onEnd();
    });
}
