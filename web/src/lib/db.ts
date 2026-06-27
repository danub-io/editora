import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/web';
import * as schema from './schema';

export const getDb = (env?: Record<string, unknown>) => {
  if (env && typeof (env as any).DB !== 'undefined') {
    // Cloudflare D1
    const { drizzle: drizzleD1 } = require('drizzle-orm/d1');
    return drizzleD1((env as any).DB, { schema });
  }

  const client = createClient({
    url: typeof process !== 'undefined' && process.env.DATABASE_URL ? process.env.DATABASE_URL : 'libsql://dummy-url-for-build.com',
  });
  return drizzle(client, { schema });
};

export const db = getDb();
