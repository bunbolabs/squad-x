import type { Config } from 'drizzle-kit'
export default {
  schema: './drizzle/schema.ts',
  out: './drizzle/migrates',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config
