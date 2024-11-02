import { GeneralError } from "../utils/general-error";
import { Logger } from "../utils/logger";
import { MachineReading, MachineState } from "../utils/types";

export class ReadingService {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async processReading(reading: MachineReading): Promise<void> {
    try {
      await this.validateReading(reading);
      const state = this.determineState(reading);
    } catch (error) {
      this.logger.error("Error processing reading", error);
      throw new GeneralError(500, "Failed to process reading");
    }
  }

  private determineState(reading: MachineReading): MachineState {
    // get machine threshold from reading machineId
    return MachineState.RUNNING;
  }

  private async validateReading(reading: MachineReading): Promise<void> {
    // ensure machineId belongs to espId
    // ensure currentRate is within valid range for such machine
  }
}
