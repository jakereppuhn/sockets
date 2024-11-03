import { Services } from ".";
import { GeneralError } from "../utils/general-error";
import { Logger } from "../utils/logger";
import { MachineReading, MachineState } from "../utils/types";
import { DatabaseService } from "./database-service";

export class ReadingService {
  private logger: Logger;
  private db: DatabaseService;

  constructor(logger: Logger, db: DatabaseService) {
    this.logger = logger;
    this.db = db;
  }

  async processReading(reading: MachineReading): Promise<void> {
    try {
      await this.validateReading(reading);
      const state = this.determineState(reading);

      await this.db.saveReading({
        ...reading,
        state,
        timestamp: new Date(),
      });
    } catch (error) {
      this.logger.error("Error processing reading", error);
      throw new GeneralError(500, "Failed to process reading");
    }
  }

  private determineState(reading: MachineReading): MachineState {
    // Simple threshold check
    return reading.ampReading > 1.0 ? MachineState.RUNNING : MachineState.IDLE;
  }

  private async validateReading(reading: MachineReading): Promise<void> {
    if (!reading.machineId || typeof reading.ampReading !== "number") {
      throw new GeneralError(400, "Invalid reading data");
    }
  }
}
