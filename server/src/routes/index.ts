import { Router } from "express";
import { ResponseHandler } from "../middleware/response-handler";
import { Logger } from "../utils/logger";
import { GeneralError } from "../utils/general-error";
import { ReadingService } from "../services";
import { DatabaseService } from "../services/database-service";
import { MachineReading } from "../utils/types";

export const createRoutes = (logger: Logger) => {
  const router = Router();
  const dbService = new DatabaseService(logger);
  const readingService = new ReadingService(logger, dbService);

  router.post("/reading", async (req, res, next) => {
    try {
      const reading: MachineReading = req.body;
      await readingService.processReading(reading);
      res.json(
        ResponseHandler.success({ message: "Reading processed successfully" }),
      );
    } catch (error) {
      next(error);
    }
  });

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
