import WebSocket from "ws";
import {
  MachineReading,
  WSConnectionInfo,
  WSManagerConfig,
  WSMessage,
  WSMessageType,
} from "../utils/types";
import { Logger } from "../utils/logger";
import { EventEmitter } from "stream";

export class WebSocketManager extends EventEmitter {
  private connections: Map<string, WebSocket>;
  private connectionInfo: Map<string, WSConnectionInfo>;
  private logger: Logger;
  private heartbeatIntervals: Map<string, NodeJS.Timeout>;
  private readonly config: Required<WSManagerConfig>;

  constructor(
    logger: Logger,
    config: WSManagerConfig = {},
  ) {
    super();
    this.connections = new Map();
    this.connectionInfo = new Map();
    this.heartbeatIntervals = new Map();
    this.logger = logger;

    this.config = {
      heartbeatInterval: 30000,
      heartbeatTimeout: 10000,
      maxReconnectAttempts: 5,
      reconnectInterval: 5000,
      ...config,
    };

    this.logger.info("WebSocket Manager initialized and ready 🚀", {
      timestamp: new Date(),
      activeConnections: this.connections.size,
    });
  }

  public handleConnection(machineId: string, socket: WebSocket): void {
    try {
      this.cleanupConnection(machineId);

      this.connections.set(machineId, socket);
      this.connectionInfo.set(machineId, {
        machineId,
        connectedAt: new Date(),
        lastHeartbeat: new Date(),
        connectionQuality: 100,
        reconnectAttempts: 0,
      });

      this.setupSocketListeners(machineId, socket);

      this.startHeartbeatMonitoring(machineId);

      this.logger.info(`New connection established for machine ${machineId}`, {
        timestamp: new Date(),
        activeConnections: this.connections.size,
      });
      this.emit("connection", { machineId, timestamp: new Date() });
    } catch (error) {
      this.logger.error(
        `Error handling connection for machine ${machineId}:`,
        error,
      );
      this.emit("error", {
        machineId,
        error,
        timestamp: new Date(),
      });
    }
  }

  public broadcastReading(reading: MachineReading): void {
    const message: WSMessage<MachineReading> = {
      type: WSMessageType.READING,
      payload: reading,
      timestamp: new Date(),
    };

    this.broadcast(message);
  }

  public sendToMachine(machineId: string, message: WSMessage): boolean {
    try {
      const socket = this.connections.get(machineId);
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        throw new Error(`No active connection for machine ${machineId}`);
      }

      socket.send(JSON.stringify(message));
      return true;
    } catch (error) {
      this.logger.error(
        `Error sending message to machine ${machineId}:`,
        error,
      );
      return false;
    }
  }

  public getConnectionInfo(machineId: string): WSConnectionInfo | undefined {
    return this.connectionInfo.get(machineId);
  }

  public getAllConnections(): Map<string, WSConnectionInfo> {
    return new Map(this.connectionInfo);
  }

  private broadcast(message: WSMessage): void {
    const payload = JSON.stringify(message);
    this.connections.forEach((socket, machineId) => {
      try {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(payload);
        }
      } catch (error) {
        this.logger.error(`Error broadcasting to machine ${machineId}:`, error);
      }
    });
  }

  private setupSocketListeners(machineId: string, socket: WebSocket): void {
    socket.on("message", (data: WebSocket.Data) => {
      try {
        const message: WSMessage = JSON.parse(data.toString());
        this.handleIncomingMessage(machineId, message);
      } catch (error) {
        this.logger.error(
          `Error handling message from machine ${machineId}:`,
          error,
        );
      }
    });

    socket.on("close", () => {
      this.handleDisconnection(machineId);
    });

    socket.on("error", (error) => {
      this.logger.error(`WebSocket error for machine ${machineId}:`, error);
      this.emit("error", { machineId, error, timestamp: new Date() });
    });
  }

  private handleIncomingMessage(machineId: string, message: WSMessage): void {
    const info = this.connectionInfo.get(machineId);
    if (!info) return;

    switch (message.type) {
      case WSMessageType.HEARTBEAT:
        this.updateHeartbeat(machineId);
        break;
      case WSMessageType.ERROR:
        this.logger.error(`Error from machine ${machineId}:`, message.payload);
        this.emit("machineError", {
          machineId,
          error: message.payload,
          timestamp: new Date(),
        });
        break;
      default:
        this.emit("message", { machineId, message, timestamp: new Date() });
    }
  }

  private updateHeartbeat(machineId: string): void {
    const info = this.connectionInfo.get(machineId);
    if (info) {
      info.lastHeartbeat = new Date();
      this.connectionInfo.set(machineId, info);
    }
  }

  private startHeartbeatMonitoring(machineId: string): void {
    const interval = setInterval(() => {
      this.checkHeartbeat(machineId);
    }, this.config.heartbeatInterval);

    this.heartbeatIntervals.set(machineId, interval);
  }

  private checkHeartbeat(machineId: string): void {
    const info = this.connectionInfo.get(machineId);
    if (!info) return;

    const timeSinceLastHeartbeat = Date.now() - info.lastHeartbeat.getTime();
    if (timeSinceLastHeartbeat > this.config.heartbeatTimeout) {
      this.handleDisconnection(machineId);
    }
  }

  private handleDisconnection(machineId: string): void {
    const info = this.connectionInfo.get(machineId);
    if (!info) return;

    if (info.reconnectAttempts < this.config.maxReconnectAttempts) {
      this.attemptReconnection(machineId);
    } else {
      this.cleanupConnection(machineId);
      this.emit("disconnection", { machineId, timestamp: new Date() });
    }
  }

  private attemptReconnection(machineId: string): void {
    const info = this.connectionInfo.get(machineId);
    if (!info) return;

    info.reconnectAttempts += 1;
    this.connectionInfo.set(machineId, info);

    this.emit("reconnecting", {
      machineId,
      attempt: info.reconnectAttempts,
      timestamp: new Date(),
    });

    // Implement your reconnection logic here
    // This would typically involve creating a new WebSocket connection
    // and calling handleConnection() with the new socket
  }

  private cleanupConnection(machineId: string): void {
    const socket = this.connections.get(machineId);
    if (socket) {
      socket.terminate();
    }

    const heartbeatInterval = this.heartbeatIntervals.get(machineId);
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
    }

    this.connections.delete(machineId);
    this.connectionInfo.delete(machineId);
    this.heartbeatIntervals.delete(machineId);
  }

  public destroy(): void {
    for (const machineId of this.connections.keys()) {
      this.cleanupConnection(machineId);
    }

    this.removeAllListeners();
    this.logger.info("WebSocket manager destroyed");
  }
}
