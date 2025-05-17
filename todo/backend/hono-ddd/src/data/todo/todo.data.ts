import { TodoEntity } from '@/core/entities/todo.entity';
import { SQLiteClient } from '@/data/sqlite-client';
import { eq } from 'drizzle-orm';
import { TodoDataAdapter } from './todo.adapter';
import { todoTable } from './todo.schema';

export class TodoData {
  constructor(private readonly _dbClient: SQLiteClient, private readonly _todoDbAdapter: TodoDataAdapter) {}

  async create(todo: TodoEntity): Promise<void> {
    const todoDb = this._todoDbAdapter.toDbSchema(todo);
    await this._dbClient.client.insert(todoTable).values(todoDb);
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await this._dbClient.client.select().from(todoTable);
    return todos.map((todo) => this._todoDbAdapter.toEntity(todo));
  }

  async getById(todoId: string): Promise<TodoEntity | undefined> {
    const todo = await this._dbClient.client.select().from(todoTable).where(eq(todoTable.todoId, todoId));
    if (todo.length === 0) {
      return undefined;
    }
    return this._todoDbAdapter.toEntity(todo[0]);
  }
}
