export class AppThrower {
    static throw(message: string, code?: number): never {
      const error = new Error(message);
      if (code !== undefined) {
        (error as any).code = code;
      }
      throw error;
    }
  }
  