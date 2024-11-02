interface LoggerOptions {
  level: string;
  service: string;
}

interface LogMetadata {
  [key: string]: any;
}

export class Logger {
  private options: LoggerOptions;

  constructor(options: LoggerOptions) {
    this.options = options;
  }

  error(message: string, metadata?: LogMetadata) {
    console.error(message, metadata);
  }

  info(message: string, metadata?: LogMetadata) {
    console.info(message, metadata);
  }

  warn(message: string, metadata?: LogMetadata) {
    console.warn(message, metadata);
  }
}
