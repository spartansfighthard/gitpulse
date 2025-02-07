import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db } from './index';
import * as fs from 'fs';
import * as path from 'path';

const migrationsDir = path.join(process.cwd(), 'lib', 'db', 'migrations');

// Run migrations
console.log('Running migrations...');
migrate(db, { migrationsFolder: migrationsDir });
console.log('Migrations completed'); 