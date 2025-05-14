import { CreateTodoApp } from '@/app/todo/create-todo.app';
import { TodoData } from '@/data/todo/todo.data';
import { Context } from 'hono';
import { createTodoBody } from './schemas/create-todo.schema';

export class TodoController {
  static async createTodo(c: Context) {
    try {
      const todo = await c.req.json();
      const todoInput = createTodoBody.parse(todo);

      const createTodoApp = new CreateTodoApp(new TodoData());
      const createdTodo = await createTodoApp.execute(todoInput);
      return c.json(createdTodo);
    } catch (error) {
      return c.json({ error: error instanceof Error ? error.message : 'Unknown error' }, 500);
    }
  }
}
