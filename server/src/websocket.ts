import WebSocket, { Data } from "ws";
import { Server } from "http";
import { Logger } from "./utils/logger";
import { WebSocketManager } from "./services/websocket-service";
import { MachineReading, WSMessage, WSMessageType } from "./utils/types";
import { Services } from "./services";

export class WebSocketServer {
  private wss: WebSocket.Server;
  private logger: Logger;
  private services: Services;
  private wsManager: WebSocketManager;

  constructor(server: Server, logger: Logger, services: Services) {
    this.logger = logger;
    this.wss = new WebSocket.Server({ server });
    this.wsManager = new WebSocketManager(logger, services);

    this.initialize();
    this.setupManagerEventHandlers();
  }

  private initialize(): void {
    this.wss.on("connection", (ws: WebSocket, request) => {
      const machineId = this.extractMachineId(request);

      if (!machineId) {
        this.logger.error("No machine ID provided");
        ws.close(1008, "Machine ID required");
        return;
      }

      this.wsManager.handleConnection(machineId, ws);

      const confirmationMessage: WSMessage = {
        type: WSMessageType.CONFIG,
        payload: {
          machineId,
          timestamp: new Date(),
          message: "Successfully connected",
        },
        timestamp: new Date(),
      };

      ws.send(JSON.stringify(confirmationMessage));
    });
  }

  private setupManagerEventHandlers(): void {
    this.wsManager.on("connection", ({ machineId, timestamp }) => {});

    this.wsManager.on("disconnection", ({ machineId, timestamp }) => {
      this.logger.info(`Machine ${machineId} disconnected at ${timestamp}`);
    });

    this.wsManager.on("reconnecting", ({ machineId, attempt, timestamp }) => {
      this.logger.info(
        `Attempting to reconnect machine ${machineId} - Attempt ${attempt} at ${timestamp}`,
      );
    });

    this.wsManager.on("machineError", ({ machineId, error, timestamp }) => {
      this.logger.error(
        `Error from machine ${machineId} at ${timestamp}:`,
        error,
      );
    });

    this.wsManager.on("error", ({ machineId, error, timestamp }) => {
      this.logger.error(
        `WebSocket error for machine ${machineId} at ${timestamp}:`,
        error,
      );
    });
  }

  private extractMachineId(request: any): string | undefined {
    try {
      const url = new URL(request.url!, `http://${request.headers.host}`);
      return url.searchParams.get("machineId") || undefined;
    } catch (error) {
      this.logger.error("Error extracting machine ID:", error);
      return undefined;
    }
  }

  public broadcast(data: any): void {
    if (data instanceof Object) {
      this.wsManager.broadcastReading(data as MachineReading);
    } else {
      this.logger.error("Invalid broadcast data type");
    }
  }

  public sendToMachine(machineId: string, data: any): boolean {
    const message: WSMessage = {
      type: WSMessageType.READING,
      payload: data,
      timestamp: new Date(),
    };
    return this.wsManager.sendToMachine(machineId, message);
  }

  public getMachineStatus(machineId: string) {
    return this.wsManager.getConnectionInfo(machineId);
  }

  public getAllConnections() {
    return this.wsManager.getAllConnections();
  }

  public getActiveConnectionCount(): number {
    return this.wsManager.getAllConnections().size;
  }

  public shutdown(): void {
    this.wsManager.destroy();

    this.wss.close(() => {
      this.logger.info("WebSocket server shut down completely");
    });
  }
}
