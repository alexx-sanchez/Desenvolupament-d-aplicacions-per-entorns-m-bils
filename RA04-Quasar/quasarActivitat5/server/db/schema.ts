import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  login: text('login'),
  password: text('password'),
})

export const equips = sqliteTable('equips', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  country: text('country').notNull(),
  worldChampionships: integer('world_championships').notNull(),
  photo: text('photo').notNull(),
  userId: integer('userId').notNull()
    .references(() => users.id, { onDelete: 'cascade' })
})
