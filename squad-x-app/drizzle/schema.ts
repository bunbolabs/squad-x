import { SystemProgram } from '@solana/web3.js'
import { relations } from 'drizzle-orm'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  address: text('address').notNull().primaryKey(),
  fullName: text('fullname').notNull().default(''),
  username: text('username').notNull().default(''),
  id: text('id').notNull().default(''),
  badge: text('badge').notNull().default('Newbie'),
  squad: text('squad').notNull().default(SystemProgram.programId.toString()),
  picture: text('picture').notNull().default(''),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  account: text('account').notNull().default(''),
})

export const dinos = pgTable('dinos', {
  address: text('address').notNull().primaryKey(),
  user: text('user')
    .notNull()
    .default('')
    .references(() => users.address),
  dino: text('dino').notNull().default(''),
  rank: text('rank').notNull().default(''),
  xp: integer('xp').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const usersRelations = relations(users, ({ one }) => ({
  dino: one(quests),
}))

export const quests = pgTable('quests', {
  id: text('id').notNull().primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  tag: text('tag').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const squads = pgTable('squads', {
  name: text('name').notNull().default(''),
  motto: text('motto').notNull().default(''),
  owner: text('owner').notNull().default(''),
  account: text('account').notNull().default('').primaryKey(),
  badge: text('badge').notNull().default('Dreamers'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const admins = pgTable('admins', {
  publicKey: text('public_key').notNull().primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
