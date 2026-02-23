import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://zyztm:zyztm_password@localhost:5432/zyztm',
});

export const db = drizzle(pool, { schema });
export type DB = typeof db;
