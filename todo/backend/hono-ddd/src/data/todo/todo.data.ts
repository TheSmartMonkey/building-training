import { TodoEntity } from '@/core/entities/todo.entity';
import { DateValue } from '@/core/values/date.value';
import { SQLiteClient } from '@/data/sqlite-client';
import { eq } from 'drizzle-orm';
import { TodoDataAdapter } from './todo.adapter';
import { todoTable } from './todo.schema';

export class TodoData {
  constructor(private readonly _dbClient: SQLiteClient, private readonly _todoDbAdapter: TodoDataAdapter) {}

  async create(todo: TodoEntity): Promise<void> {
    const data = this._todoDbAdapter.toSchema(todo);
    await this._dbClient.client.insert(todoTable).values(data);
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

  async delete(todoId: string): Promise<void> {
    const result = await this._dbClient.client.delete(todoTable).where(eq(todoTable.todoId, todoId));
    if (result.changes === 0) {
      throw new Error('Todo not found');
    }
  }

  async update(todo: TodoEntity): Promise<void> {
    const data = this._todoDbAdapter.toSchema(todo);
    data.updatedAt = new DateValue(new Date()).toISOString();
    const result = await this._dbClient.client.update(todoTable).set(data).where(eq(todoTable.todoId, todo.value.todoId.value));
    if (result.changes === 0) {
      throw new Error('Nothing to update');
    }
  }
}
