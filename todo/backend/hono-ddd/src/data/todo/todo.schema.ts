import { CreateTodoBody } from '@/api/todo/schemas/create-todo.schema';
import { TodoEntity } from '@/core/entities/todo.entity';
import { DateValue } from '@/core/values/date.value';
import { UniqueIdValue } from '@/core/values/unique-id.value';
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todoTable = sqliteTable('todoTable', {
  todoId: text('todoId').primaryKey().unique().default(new UniqueIdValue().value),
  title: text('title').unique().notNull(),
  description: text('description').notNull(),
  completed: integer('completed', { mode: 'boolean' }).notNull(),
  createdAt: text('createdAt')
    .default(sql`(CURRENT_DATE)`)
    .notNull(),
  updatedAt: text('updatedAt')
    .default(sql`(CURRENT_DATE)`)
    .notNull(),
});

export type InsertDbTodo = typeof todoTable.$inferInsert;
export type SelectDbTodo = typeof todoTable.$inferSelect;

export class TodoDbSchema {
  toDbSchema(todo: CreateTodoBody): InsertDbTodo {
    return {
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
    };
  }

  toEntity(todo: SelectDbTodo): TodoEntity {
    return new TodoEntity({
      todoId: new UniqueIdValue(todo.todoId),
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      createdAt: new DateValue(new Date(todo.createdAt)),
      updatedAt: new DateValue(new Date(todo.updatedAt)),
    });
  }
}
