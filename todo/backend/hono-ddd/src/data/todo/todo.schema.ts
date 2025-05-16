import { TodoEntity } from '@/core/entities/todo.entity';
import { DateValue } from '@/core/values/date.value';
import { UniqueIdValue } from '@/core/values/unique-id.value';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todoTable = sqliteTable('todoTable', {
  todoId: text('todoId').primaryKey().unique(),
  title: text('title').unique().notNull(),
  description: text('description').notNull(),
  completed: integer('completed', { mode: 'boolean' }).notNull(),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});

// TODO: convert to classes
export type InsertDbTodo = typeof todoTable.$inferInsert;
export type SelectDbTodo = typeof todoTable.$inferSelect;

export class TodoDbSchema {
  toDbSchema(todo: TodoEntity): InsertDbTodo {
    return {
      title: todo.value.title,
      description: todo.value.description,
      completed: todo.value.completed,
      todoId: todo.value.todoId.value,
      createdAt: todo.value.createdAt.toISOString(),
      updatedAt: todo.value.updatedAt.toISOString(),
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
