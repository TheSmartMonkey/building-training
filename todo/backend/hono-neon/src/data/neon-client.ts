import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

export type DbClient = ReturnType<typeof drizzle>;

export class NeonClient {
  private static _instance?: NeonClient;
  private _client: DbClient;

  private constructor() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is required');
    }

    const sql = neon(databaseUrl);
    this._client = drizzle(sql);
  }

  get client(): DbClient {
    return this._client;
  }

  public static getInstance(): NeonClient {
    if (!NeonClient._instance) {
      NeonClient._instance = new NeonClient();
    }
    return NeonClient._instance;
  }

  // Note: Neon serverless connections are automatically managed
  // No need for explicit disconnect method
}
