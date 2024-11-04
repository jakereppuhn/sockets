import { Router } from "express";
import { ResponseHandler } from "../middleware/response-handler";
import { Logger } from "../utils/logger";
import { GeneralError } from "../utils/general-error";
import { Services } from "../services";
import { DatabaseService } from "../services/database-service";
import { AlertSeverity, AlertType, MachineReading } from "../utils/types";
import { createTestRoutes } from "./test-routes";
import { AlertService } from "../services/alert-service";

export const createRoutes = (logger: Logger, services: Services) => {
  const router = Router();
  const readingService = services.reading;
  const alertService = services.alert;

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

  router.post("/alerts/test", async (req, res, next) => {
    try {
      const { machineId, type, severity, message } = req.body;

      const alert = await alertService.createAlert(
        machineId,
        type,
        severity,
        message,
      );

      logger.info("Test alert created", { alert });

      res.json(
        ResponseHandler.success({
          message: "Alert created successfully",
          alert,
        }),
      );
    } catch (error) {
      next(error);
    }
  });

  createTestRoutes(router);

  return router;
};
