import { EnvManager } from '@/common/env';
import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1';

export type DbClient = DrizzleD1Database<Record<string, never>> & { $client: D1Database };

export class CloudflareD1Db {
  private static _instance?: CloudflareD1Db;
  private _client: DbClient;

  private constructor() {
    this._client = drizzle(EnvManager.value.DB);
  }

  get client(): DbClient {
    return this._client;
  }

  public static getInstance(): CloudflareD1Db {
    if (!CloudflareD1Db._instance) {
      CloudflareD1Db._instance = new CloudflareD1Db();
    }
    return CloudflareD1Db._instance;
  }
}
