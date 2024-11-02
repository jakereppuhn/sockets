import { NextFunction, Request, Response } from "express";
import { GeneralError } from "../utils/general-error";

export const validateRequest = (schema: any) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const validated = await schema.validate(req.body);
      req.body = validated;
      next();
    } catch (error) {
      next(new GeneralError(400, "Validation Error"));
    }
  };
};
