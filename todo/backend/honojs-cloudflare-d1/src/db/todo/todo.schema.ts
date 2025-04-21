import { CreateTodoInput } from '@/api/todo/schemas/create-todo.schema';
import { TodoEntity } from '@/core/entities/todo.entity';
import { UniqueIdValue } from '@/core/value-object/unique-id.value';
import { sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todoTable = sqliteTable('todoTable', {
  todoId: text('todoId').primaryKey().unique().default(new UniqueIdValue().value),
  name: text('name').unique().notNull(),
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
  toDbSchema(todo: CreateTodoInput['body']): InsertDbTodo {
    return {
      todoId: new UniqueIdValue().value,
      name: todo.name,
    };
  }

  toApiInput(todo: SelectDbTodo): CreateTodoInput['body'] {
    return {
      name: todo.name,
    };
  }

  toEntity(todo: SelectDbTodo): TodoEntity {
    return new TodoEntity({
      todoId: todo.todoId,
      name: todo.name,
      createdAt: new Date(todo.createdAt),
      updatedAt: new Date(todo.updatedAt),
    });
  }
}
