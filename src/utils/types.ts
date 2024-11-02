export enum MachineState {
  IDLE = 'idle',
  RUNNING = 'running',
  OFF = 'off'
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

export interface WSMessage {
  type: 'reading' | 'heartbeat' | 'config' | 'error' | 'command';
  payload: unknown;
  timestamp: Date;
}

export interface WSConnectionInfo {
  machineId: string;
  connectedAt: Date;
  lastHeartbeat: Date;
  connectionQuality: number;
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
  HIGH_AMPS = 'high_amps',
  LOW_AMPS = 'low_amps',
  DISCONNECTED = 'disconnected',
  LONG_IDLE = 'long_idle',
  ERROR = 'error'
}

export enum AlertSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export type MachineEvent = {
  type: 'state_change' | 'connection' | 'error';
  machineId: string;
  timestamp: Date;
  data: Record<string, unknown>;
}