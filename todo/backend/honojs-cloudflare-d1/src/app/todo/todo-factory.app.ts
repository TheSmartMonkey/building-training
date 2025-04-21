import { CreateTodoInput } from '@/api/todo/schemas/create-todo.schema';
import { CloudflareD1Db } from '@/db/cloudflare-d1';
import { TodoDb } from '@/db/todo/todo.db';
import { TodoDbSchema } from '@/db/todo/todo.schema';
import { CreateTodoApp } from './create-todo.app';

export class TodoFactoryApp {
  static async createTodo(input: CreateTodoInput['body']): Promise<void> {
    const todoDb = new TodoDb(CloudflareD1Db.getInstance(), new TodoDbSchema());
    const createTodoApp = new CreateTodoApp(todoDb);
    await createTodoApp.execute(input);
  }
}
