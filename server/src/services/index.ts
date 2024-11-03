import { Database } from "../config/database";
import { Logger } from "../utils/logger";
import { DatabaseService } from "./database-service";
import { ReadingService } from "./reading-service";

export class Services {
  readonly db: DatabaseService;
  readonly reading: ReadingService;

  constructor(logger: Logger) {
    Database.initialize(logger);

    this.db = new DatabaseService(logger);
    this.reading = new ReadingService(logger, this.db);
  }
}
