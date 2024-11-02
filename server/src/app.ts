import express from "express";
import http from "http";
import { Logger } from "./utils/logger";
import { Database } from "./config/database";
import { WebSocketServer } from "./websocket";
import { createRoutes } from "./routes";
import { errorHandler } from "./middleware/error-handler";
import { DatabaseService } from "./services";

export class App {
  private app: express.Application;
  private server: http.Server;
  private logger: Logger;
  private wss: WebSocketServer;
  private dbService: DatabaseService;

  constructor() {
    this.logger = new Logger({
      level: "info",
      service: "cnc-monitor",
    });

    Database.initialize(this.logger);
    this.dbService = new DatabaseService(this.logger);

    this.app = express();
    this.server = http.createServer(this.app);
    this.wss = new WebSocketServer(this.server, this.logger, this.dbService);

    this.initialize();
  }

  initialize() {
    this.app.use(express.json());

    this.app.use("/api", createRoutes(this.logger, this.dbService));

    this.app.use(errorHandler(this.logger));
  }

  start(port: number) {
    this.server.listen(port, () => {
      this.logger.info(`Server started`, {
        port,
        timestamp: new Date(),
        service: "server",
        environment: process.env.NODE_ENV || "development",
        event: "startup",
      });
    });
  }
}

const app = new App();
app.start(3000);
