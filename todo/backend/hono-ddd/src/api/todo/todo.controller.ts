import { CreateTodoApp } from '@/app/todo/create-todo.app';
import { SQLiteClient } from '@/data/sqlite-client';
import { TodoData } from '@/data/todo/todo.data';
import { TodoDbSchema } from '@/data/todo/todo.schema';
import { Context } from 'hono';
import { createTodoBody } from './schemas/create-todo.schema';

export class TodoController {
  static async createTodo(c: Context) {
    try {
      const todo = await c.req.json();
      const todoInput = createTodoBody.parse(todo);

      const db = SQLiteClient.getInstance();
      const createTodoApp = new CreateTodoApp(new TodoData(db, new TodoDbSchema()));
      const createdTodo = await createTodoApp.execute(todoInput);
      return c.json(createdTodo.value);
    } catch (error) {
      return c.json({ error: error instanceof Error ? error.message : 'Unknown error' }, 500);
    }
  }
}
