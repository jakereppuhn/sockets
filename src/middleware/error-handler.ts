import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Logger } from "../utils/logger";
import { GeneralError } from "../utils/general-error";

interface ErrorLogMetadata {
  statusCode: number;
  path: string;
  [key: string]: any;
}

export const errorHandler = (logger: Logger): ErrorRequestHandler => {
  return (
    error: Error | GeneralError,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    if (error instanceof GeneralError) {
      const metadata: ErrorLogMetadata = {
        statusCode: error.statusCode,
        path: req.path,
      };

      logger.error(error.message, metadata);

      res.status(error.statusCode).json({
        success: false,
        error: error.message,
        meta: {
          timestamp: new Date(),
          path: req.path,
        },
      });
      return;
    }

    const metadata = {
      path: req.path,
    };

    logger.error("Unhandled error", metadata);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      meta: {
        timestamp: new Date(),
        path: req.path,
      },
    });
    return;
  };
};
