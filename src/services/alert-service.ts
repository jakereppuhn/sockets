import { Alert, AlertSeverity, AlertType, Machine } from "../utils/types";
import { Logger } from "../utils/logger";
import { GeneralError } from "../utils/general-error";

export class AlertService {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async createAlert(
    machineId: string,
    type: AlertType,
    severity: AlertSeverity,
    message: string,
  ): Promise<Alert> {
    try {
      const alert: Alert = {
        id: crypto.randomUUID(),
        machineId,
        type,
        severity,
        message,
        timestamp: new Date(),
        acknowledged: false,
      };

      return alert;
    } catch (error) {
      this.logger.error("Failed to create alert", error);
      throw new GeneralError(500, "Alert creation failed");
    }
  }
}
