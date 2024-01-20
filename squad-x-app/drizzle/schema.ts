import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  address: text('address').notNull().primaryKey(),
  fullName: text('fullname').notNull().default(''),
  username: text('username').notNull().default(''),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

type Tag = 'daily' | 'achievement' | 'mission'

export const quests = pgTable('quests', {
  id: text('id').notNull().primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  tag: text('tag').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const admins = pgTable('admins', {
  publicKey: text('public_key').notNull().primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
