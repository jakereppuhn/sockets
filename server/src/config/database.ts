import sqlite3 from "sqlite3";
import { Logger } from "../utils/logger";

export class Database {
  private static instance: sqlite3.Database;
  private static logger: Logger;

  static initialize(logger: Logger): void {
    try {
      Database.logger = logger;
      Database.instance = new sqlite3.Database("cnc_monitor.db");

      Database.instance.run(`
        CREATE TABLE IF NOT EXISTS readings (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          machine_id TEXT NOT NULL,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
          amp_reading REAL NOT NULL,
          state TEXT NOT NULL
        )
      `);
    } catch (error) {
      logger.error("Database initialization failed", error);
      throw error;
    }
  }

  static getInstance(): sqlite3.Database {
    if (!Database.instance) {
      throw new Error("Database not initialized");
    }
    return Database.instance;
  }
}
