import Database from 'better-sqlite3';
import { BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3';

export type DbClient = BetterSQLite3Database<Record<string, never>> & { $client: Database.Database };

export class SQLiteClient {
  private static _instance?: SQLiteClient;
  private _client: DbClient;

  private constructor() {
    this._client = drizzle(new Database('db.sqlite'));
  }

  get client(): DbClient {
    return this._client;
  }

  public static getInstance(): SQLiteClient {
    if (!SQLiteClient._instance) {
      SQLiteClient._instance = new SQLiteClient();
    }
    return SQLiteClient._instance;
  }

  disconnect(): void {
    this._client.$client.close();
  }
}
