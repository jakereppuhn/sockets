import { AlertSeverity, MachineState } from "./types";

export const SYSTEM = {
  RECONNECT_INTERVAL: 30000,
  MAX_RETRY_ATTEMPTS: 5,
  DEFAULT_TIMEOUT: 5000,
} as const;

export const MACHINE_STATES: Record<string, MachineState> = {
  IDLE: MachineState.IDLE,
  RUNNING: MachineState.RUNNING,
  OFF: MachineState.OFF,
} as const;

export const ALERT_SEVERITIES: Record<string, AlertSeverity> = {
  LOW: AlertSeverity.LOW,
  MEDIUM: AlertSeverity.MEDIUM,
  HIGH: AlertSeverity.HIGH,
  CRITICAL: AlertSeverity.CRITICAL,
} as const;

export const ERROR_CODES = {
  VALIDATION_ERROR: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
} as const;

export const EVENTS = {
  MACHINE_CONNECTED: "machine:connected",
  MACHINE_DISCONNECTED: "machine:disconnected",
  READING_RECEIVED: "reading:received",
  STATE_CHANGED: "state:changed",
} as const;
