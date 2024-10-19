import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function connectToDatabase() {
  return open({
    filename: './db.sqlite',
    driver: sqlite3.Database
  });
}
