import type { Config } from 'drizzle-kit';

export default {
  schema: './lib/db/schema/*',
  out: './lib/db/migrations',
  driver: 'libsql',
  dbCredentials: {
    url: 'file:sqlite.db'
  },
  verbose: true,
  strict: true,
} satisfies Config; 