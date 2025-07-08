import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const todoTable = pgTable('todoTable', {
  todoId: uuid('todoId').primaryKey().defaultRandom(),
  title: text('title').unique().notNull(),
  description: text('description').notNull(),
  completed: boolean('completed').notNull().default(false),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export type InsertDbTodo = typeof todoTable.$inferInsert;
export type SelectDbTodo = typeof todoTable.$inferSelect;
