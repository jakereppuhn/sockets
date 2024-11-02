import { Router } from "express";
import { ResponseHandler } from "../middleware/response-handler";
import { Logger } from "../utils/logger";
import { Database } from "../config/database";

export const createRoutes = (logger: Logger) => {
  const router = Router();
  const db = Database.getInstance();

  router.get("/machines", async (req, res, next) => {
    try {
      res.json(ResponseHandler.success([]));
    } catch (error) {
      next(error);
    }
  });

  router.get("/machine/:id/readings", async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(ResponseHandler.success([]));
    } catch (error) {
      next(error);
    }
  });

  return router;
};
