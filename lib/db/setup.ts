import * as fs from 'fs';
import * as path from 'path';

// Create necessary directories
const dirs = [
  'lib/db/migrations',
  'lib/db/migrations/meta',
  'lib/db/schema',
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Create initial _journal.json if it doesn't exist
const journalPath = path.join('lib/db/migrations/meta/_journal.json');
if (!fs.existsSync(journalPath)) {
  const initialJournal = {
    "version": "5",
    "dialect": "sqlite",
    "entries": []
  };
  
  fs.writeFileSync(
    journalPath,
    JSON.stringify(initialJournal, null, 2)
  );
}

// Create default .env if it doesn't exist
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  const defaultEnv = {
    NEXT_PUBLIC_SOLANA_RPC_URL: 'https://api.devnet.solana.com',
    NEXT_PUBLIC_SOLANA_NETWORK: 'devnet',
  };

  const envContent = Object.entries(defaultEnv)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  fs.writeFileSync(envPath, envContent);
}

console.log('Database directories and files created successfully'); 