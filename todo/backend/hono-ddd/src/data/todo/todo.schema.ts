import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todoTable = sqliteTable('todoTable', {
  todoId: text('todoId').primaryKey().unique(),
  title: text('title').unique().notNull(),
  description: text('description').notNull(),
  completed: integer('completed', { mode: 'boolean' }).notNull(),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});

export type InsertDbTodo = typeof todoTable.$inferInsert;
export type SelectDbTodo = typeof todoTable.$inferSelect;
