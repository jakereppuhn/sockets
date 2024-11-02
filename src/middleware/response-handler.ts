interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta: {
    timestamp: Date;
    path?: string;
    [key: string]: any;
  };
}

export class ResponseHandler {
  static success<T>(data: T, path?: string, meta?: object): ApiResponse<T> {
    return {
      success: true,
      data,
      meta: {
        timestamp: new Date(),
        path,
        ...meta,
      },
    };
  }

  static error(
    message: string,
    path?: string,
    meta?: object,
  ): ApiResponse<null> {
    return {
      success: false,
      error: message,
      meta: {
        timestamp: new Date(),
        path,
        ...meta,
      },
    };
  }
}
