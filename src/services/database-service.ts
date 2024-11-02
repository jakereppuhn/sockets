import { Machine, MachineReading } from "../utils/types";
import { Logger } from "../utils/logger";
import { GeneralError } from "../utils/general-error";

export class DatabaseService {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async saveReading(reading: MachineReading): Promise<void> {
    try {
    } catch (error) {
      this.logger.error("Database error", error);
      throw new GeneralError(500, "Database operation failed");
    }
  }

  async getMachineReadings(
    machineId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<MachineReading[]> {
    return [];
  }
}
