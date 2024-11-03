import { Router } from "express";
import { ResponseHandler } from "../middleware/response-handler";
import { Logger } from "../utils/logger";
import { GeneralError } from "../utils/general-error";
import { Services } from "../services";
import { DatabaseService } from "../services/database-service";
import { MachineReading } from "../utils/types";
import { createTestRoutes } from "./test-routes";

export const createRoutes = (logger: Logger, services: Services) => {
  const router = Router();
  const readingService = services.reading;

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

  createTestRoutes(router);

  return router;
};
