import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

let db: ReturnType<typeof drizzle>;

if (process.env.NODE_ENV !== 'production') {
  const sqlite = new Database('sqlite.db');
  db = drizzle(sqlite);
}

export { db }; 