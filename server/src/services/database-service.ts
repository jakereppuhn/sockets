import { Machine, MachineReading } from "../utils/types";
import { Logger } from "../utils/logger";
import { GeneralError } from "../utils/general-error";
import { Database } from "../config/database";
import sqlite3 from "sqlite3";

interface IdleTimeResult {
  idle_time: number;
}

export class DatabaseService {
  private logger: Logger;
  private db: sqlite3.Database;

  constructor(logger: Logger) {
    this.logger = logger;
    this.db = Database.getInstance();
  }

  saveReading(reading: MachineReading): Promise<void> {
    const sql = `
      INSERT INTO readings (
        machine_id, timestamp, amp_reading, state
      ) VALUES (?, ?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
      this.db.run(sql, [
        reading.machineId,
        reading.timestamp,
        reading.ampReading,
        reading.state,
      ], (err) => {
        if (err) {
          this.logger.error("Database error", err);
          reject(new GeneralError(500, "Database operation failed"));
        } else {
          resolve();
        }
      });
    });
  }

  getIdleTime(machineId: string): Promise<number> {
    const sql = `
      SELECT MAX(timestamp) - MIN(timestamp) as idle_time
      FROM readings
      WHERE machine_id = ? 
      AND state = 'idle'
      AND timestamp > datetime('now', '-1 day')
    `;

    return new Promise((resolve, reject) => {
      this.db.get(sql, [machineId], (err, row: IdleTimeResult | undefined) => {
        if (err) {
          this.logger.error("Database error", err);
          reject(new GeneralError(500, "Database query failed"));
        } else {
          resolve(row?.idle_time ?? 0);
        }
      });
    });
  }
}
