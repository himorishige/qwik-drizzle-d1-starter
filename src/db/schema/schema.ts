import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: text('createdAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updatedAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
