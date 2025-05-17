import { CreateTodoApp } from '@/app/todo/create-todo.app';
import { GetAllTodoApp } from '@/app/todo/get-all-todo.app';
import { GetTodoByIdApp } from '@/app/todo/get-todo-by-id.app';
import { SQLiteClient } from '@/data/sqlite-client';
import { TodoDataAdapter } from '@/data/todo/todo.adapter';
import { TodoData } from '@/data/todo/todo.data';
import { Context } from 'hono';
import { createTodoInput } from './dtos/create-todo.dto';
import { TodoApiAdapter } from './todo.adapter';

// TODO: use controller with trycatch in routes
export class TodoController {
  static async createTodo(c: Context): Promise<Response> {
    try {
      const todo = await c.req.json();
      const todoInput = createTodoInput.parse(todo);

      const db = SQLiteClient.getInstance();
      const createTodoApp = new CreateTodoApp(new TodoData(db, new TodoDataAdapter()));
      const createdTodo = await createTodoApp.execute(todoInput);
      return c.json(TodoApiAdapter.toOutput(createdTodo));
    } catch (error) {
      return c.json({ error: error instanceof Error ? error.message : 'Unknown error' }, 500);
    }
  }

  static async getAllTodo(c: Context): Promise<Response> {
    try {
      const db = SQLiteClient.getInstance();
      const getAllTodoApp = new GetAllTodoApp(new TodoData(db, new TodoDataAdapter()));
      const todoEntities = await getAllTodoApp.execute();
      const todos = todoEntities.map((todo) => TodoApiAdapter.toOutput(todo));
      return c.json(todos);
    } catch (error) {
      return c.json({ error: error instanceof Error ? error.message : 'Unknown error' }, 500);
    }
  }

  static async getTodoById(c: Context): Promise<Response> {
    try {
      const todoId = c.req.param('todoId');
      const db = SQLiteClient.getInstance();
      const getTodoByIdApp = new GetTodoByIdApp(new TodoData(db, new TodoDataAdapter()));
      const todo = await getTodoByIdApp.execute({ todoId });
      return c.json(TodoApiAdapter.toOutput(todo));
    } catch (error) {
      return c.json({ error: error instanceof Error ? error.message : 'Unknown error' }, 500);
    }
  }
}
