export interface ApiResponse<T> {
    meta: {
      returnCode: number;
      message: string;
      requestId?: string;
      responseId?: string;
    },
    data: T;
  }
  