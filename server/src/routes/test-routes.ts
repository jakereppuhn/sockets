import { Router } from "express";
import { ResponseHandler } from "../middleware/response-handler";
import { GeneralError } from "../utils/general-error";

export const createTestRoutes = (router: Router) => {
  router.get("/test-success", async (req, res, next) => {
    try {
      res.json(ResponseHandler.success([]));
    } catch (error) {
      next(error);
    }
  });

  router.get("/test-general-error", async (req, res, next) => {
    try {
      throw new GeneralError(400, "Something went wrong");
    } catch (error) {
      next(error);
    }
  });

  router.get("/test-unknown-error", async (req, res, next) => {
    try {
      throw new Error("This is an unknown error");
    } catch (error) {
      next(error);
    }
  });

  return router;
};
