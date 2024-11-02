import express from "express";
import http from "http";
import { Logger } from "./utils/logger";
import { Database } from "./config/database";
import { WebSocketServer } from "./websocket-server";
import { createRoutes } from "./routes";
import { errorHandler } from "./middleware/error-handler";
import { GeneralError } from "./utils/general-error";

export class App {
  private app: express.Application;
  private server: http.Server;
  private logger: Logger;
  private wss: WebSocketServer;

  constructor() {
    this.logger = new Logger({
      level: "info",
      service: "cnc-monitor",
    });

    this.app = express();
    this.server = http.createServer(this.app);
    this.wss = new WebSocketServer(this.server, this.logger);

    this.initialize();
  }

  initialize() {
    Database.initialize(this.logger);

    this.app.use(express.json());

    this.app.use("/api", createRoutes(this.logger));

    this.app.get("/test-general-error", (req, res, next) => {
      next(new GeneralError(400, "Something went wrong"));
    });

    this.app.get("/test-unknown-error", (req, res, next) => {
      throw new Error("This is an unknown error");
    });

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
