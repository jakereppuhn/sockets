interface ErrorWithStatusCode extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export class GeneralError extends Error implements ErrorWithStatusCode {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    statusCode: number,
    message: string,
    isOperational = true,
    stack = "",
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = this.constructor.name;

    if (stack) {
      this.stack = stack;
    }
  }
}

export class ValidationError extends GeneralError {
  constructor(message: string = "Validation Error") {
    super(400, message, true);
  }
}

export class DatabaseError extends GeneralError {
  constructor(message: string = "Database Error") {
    super(500, message, true);
  }
}

export class WebSocketError extends GeneralError {
  constructor(message: string = "WebSocket Error") {
    super(500, message, true);
  }
}
