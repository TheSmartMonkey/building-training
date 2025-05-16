import { CreateTodoApp } from '@/app/todo/create-todo.app';
import { GetAllTodoApp } from '@/app/todo/get-all-todo.app';
import { SQLiteClient } from '@/data/sqlite-client';
import { TodoData } from '@/data/todo/todo.data';
import { TodoDbSchema } from '@/data/todo/todo.schema';
import { Context } from 'hono';
import { CreateTodoDto, createTodoInput } from './dtos/create-todo.dto';

// TODO: use controller with trycatch in routes
export class TodoController {
  static async createTodo(c: Context): Promise<Response> {
    try {
      const todo = await c.req.json();
      const todoInput = createTodoInput.parse(todo);

      const db = SQLiteClient.getInstance();
      const createTodoApp = new CreateTodoApp(new TodoData(db, new TodoDbSchema()));
      const createdTodo = await createTodoApp.execute(todoInput);
      return c.json(CreateTodoDto.toOutput(createdTodo));
    } catch (error) {
      return c.json({ error: error instanceof Error ? error.message : 'Unknown error' }, 500);
    }
  }

  static async getAllTodo(c: Context): Promise<Response> {
    try {
      const db = SQLiteClient.getInstance();
      const getAllTodoApp = new GetAllTodoApp(new TodoData(db, new TodoDbSchema()));
      const todoEntities = await getAllTodoApp.execute();
      const todos = CreateTodoDto.toOutputList(todoEntities);
      return c.json(todos);
    } catch (error) {
      return c.json({ error: error instanceof Error ? error.message : 'Unknown error' }, 500);
    }
  }
}
