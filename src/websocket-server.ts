import WebSocket from "ws";
import { Server } from "http";
import { Logger } from "./utils/logger";
import { MachineReading } from "./utils/types";

export class WebSocketServer {
  private wss: WebSocket.Server;
  private logger: Logger;

  constructor(server: Server, logger: Logger) {
    this.logger = logger;
    this.wss = new WebSocket.Server({ server });
    this.initialize();
  }

  private initialize(): void {
    this.wss.on("connection", (ws: WebSocket) => {
      this.logger.info("New WebSocket connection");

      ws.on("message", (data: WebSocket.Data) => {
        try {
          const reading = JSON.parse(data.toString()) as MachineReading;
        } catch (error) {
          this.logger.error("WebSocket message error", error);
        }
      });

      ws.on("close", () => {
        this.logger.info("Client disconnected");
      });
    });
  }

  broadcast(data: any): void {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }
}
