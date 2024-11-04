import { Database } from "../config/database";
import { Logger } from "../utils/logger";
import { AlertService } from "./alert-service";
import { DatabaseService } from "./database-service";
import { ReadingService } from "./reading-service";

export class Services {
  readonly alert: AlertService;
  readonly db: DatabaseService;
  readonly reading: ReadingService;

  constructor(logger: Logger) {
    Database.initialize(logger);

    this.alert = new AlertService(logger);
    this.db = new DatabaseService(logger);
    this.reading = new ReadingService(logger, this.db);
  }
}
