import { relations } from 'drizzle-orm'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  address: text('address').notNull().primaryKey(),
  fullName: text('fullname').notNull().default(''),
  username: text('username').notNull().default(''),
  id: text('id').notNull().default(''),
  // dino: text('address').references(() => dinos.address),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const dinos = pgTable('dinos', {
  address: text('address').notNull().primaryKey(),
  user: text('user')
    .notNull()
    .default('')
    .references(() => users.address),
  dino: text('dino').notNull().default(''),
  rank: text('rank').notNull().default(''),
  xp: integer('xp').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const usersRelations = relations(users, ({ one }) => ({
  dino: one(quests),
}))

// export const profileInfo = pgTable('profile_info', {
//   id: serial('id').primaryKey(),
//   userId: integer('user_id').references(() => users.id),
//   metadata: jsonb('metadata'),
// });

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
