import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  address: text('address').notNull().primaryKey(),
  referenceId: text('reference_id').notNull(),
  email: text('email').notNull(),
  username: text('username').default(''),
})

export const admins = pgTable('admins', {
  publicKey: text('public_key').notNull().primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
