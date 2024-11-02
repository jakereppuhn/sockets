export enum MachineState {
  IDLE = "IDLE",
  RUNNING = "RUNNING",
  ERROR = "ERROR",
  MAINTENANCE = "MAINTENANCE",
}

export interface MachineReading {
  machineId: string;
  timestamp: Date;
  ampReading: number;
  state: MachineState;
  connectionQuality?: number;
}

export interface MachineConfig {
  id: string;
  idleThreshold: number;
  runningThreshold: number;
  samplingRate: number;
  alertThresholds?: {
    minAmps?: number;
    maxAmps?: number;
    maxIdleTime?: number;
  };
}

export interface Machine {
  id: string;
  name: string;
  lastSeen: Date;
  status: MachineState;
  config: MachineConfig;
  metadata?: Record<string, unknown>;
}

export enum WebSocketState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

export enum WSMessageType {
  READING = "reading",
  HEARTBEAT = "heartbeat",
  CONFIG = "config",
  ERROR = "error",
  COMMAND = "command",
}

// Interfaces
export interface MachineReading {
  machineId: string;
  timestamp: Date;
  ampReading: number;
  state: MachineState;
  connectionQuality?: number;
}

export interface WSMessage<T = unknown> {
  type: WSMessageType;
  payload: T;
  timestamp: Date;
}

export interface WSConnectionInfo {
  machineId: string;
  connectedAt: Date;
  lastHeartbeat: Date;
  connectionQuality: number;
  reconnectAttempts: number;
}

export interface WSManagerConfig {
  heartbeatInterval?: number; // ms
  heartbeatTimeout?: number; // ms
  maxReconnectAttempts?: number;
  reconnectInterval?: number; // ms
}

export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    timestamp: Date;
    [key: string]: unknown;
  };
}

export interface ErrorResponse {
  message: string;
  code: number;
  details?: unknown;
}

export interface Alert {
  id: string;
  machineId: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

export enum AlertType {
  HIGH_AMPS = "high_amps",
  LOW_AMPS = "low_amps",
  DISCONNECTED = "disconnected",
  LONG_IDLE = "long_idle",
  ERROR = "error",
}

export enum AlertSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export type MachineEvent = {
  type: "state_change" | "connection" | "error";
  machineId: string;
  timestamp: Date;
  data: Record<string, unknown>;
};
