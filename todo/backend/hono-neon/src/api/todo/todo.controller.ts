import { CreateTodoApp } from '@/app/todo/create-todo.app';
import { GetTodoByIdApp } from '@/app/todo/get-todo-by-id.app';
import { MarkTodoCompletedApp } from '@/app/todo/mark-todo-completed.app';
import { MarkTodoUncompletedApp } from '@/app/todo/mark-todo-uncompleted.app';
import { UpdateTodoApp } from '@/app/todo/update-todo.app';
import { NeonClient } from '@/data/neon-client';
import { TodoDataAdapter } from '@/data/todo/todo.adapter';
import { TodoData } from '@/data/todo/todo.data';
import { CreateTodoInput, CreateTodoOutput } from './dtos/create-todo.dto';
import { UpdateTodoInput, updateTodoInput } from './dtos/update-todo.dto';
import { TodoApiAdapter } from './todo.adapter';

export class TodoController {
  static async createTodo({ body }: { body: CreateTodoInput }): Promise<CreateTodoOutput> {
    const db = NeonClient.getInstance();
    const createTodoApp = new CreateTodoApp(new TodoData(db, new TodoDataAdapter()));
    return createTodoApp.execute(body);
  }

  static async getAllTodo(): Promise<CreateTodoOutput[]> {
    const db = NeonClient.getInstance();
    const todoData = new TodoData(db, new TodoDataAdapter());
    const todoEntities = await todoData.getAll();
    const todos = todoEntities.map((todo) => TodoApiAdapter.toOutput(todo));
    return todos;
  }

  static async getTodoById({ params }: { params: { todoId: string } }): Promise<CreateTodoOutput> {
    const todoId = params.todoId;
    const db = NeonClient.getInstance();
    const getTodoByIdApp = new GetTodoByIdApp(new TodoData(db, new TodoDataAdapter()));
    const todo = await getTodoByIdApp.execute({ todoId });
    return TodoApiAdapter.toOutput(todo);
  }

  static async deleteTodo({ params }: { params: { todoId: string } }): Promise<{ message: string }> {
    const todoId = params.todoId;
    const db = NeonClient.getInstance();
    const todoData = new TodoData(db, new TodoDataAdapter());
    await todoData.delete(todoId);
    return { message: 'Todo deleted successfully' };
  }

  static async updateTodo({ params, body }: { params: { todoId: string }; body: UpdateTodoInput }): Promise<{ message: string }> {
    const todoId = params.todoId;
    const todo = body;
    const todoInput = updateTodoInput.parse(todo);

    const db = NeonClient.getInstance();
    const updateTodoApp = new UpdateTodoApp(new TodoData(db, new TodoDataAdapter()));
    await updateTodoApp.execute(todoId, todoInput);
    return { message: 'Todo updated successfully' };
  }

  static async markTodoCompleted({ params }: { params: { todoId: string } }): Promise<{ message: string }> {
    const todoId = params.todoId;
    const db = NeonClient.getInstance();
    const markTodoCompletedApp = new MarkTodoCompletedApp(new TodoData(db, new TodoDataAdapter()));
    await markTodoCompletedApp.execute({ todoId });
    return { message: 'Todo updated successfully' };
  }

  static async markTodoUncompleted({ params }: { params: { todoId: string } }): Promise<{ message: string }> {
    const todoId = params.todoId;
    const db = NeonClient.getInstance();
    const markTodoUncompletedApp = new MarkTodoUncompletedApp(new TodoData(db, new TodoDataAdapter()));
    await markTodoUncompletedApp.execute({ todoId });
    return { message: 'Todo updated successfully' };
  }
}
