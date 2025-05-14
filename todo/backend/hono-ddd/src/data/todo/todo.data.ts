import { TodoEntity } from '@/core/entities/todo.entity';
import { SQLiteClient } from '@/data/sqlite-client';
import { TodoDbSchema, todoTable } from './todo.schema';

export class TodoData {
  constructor(private readonly _dbClient: SQLiteClient, private readonly _todoDbSchema: TodoDbSchema) {}

  async create(todo: TodoEntity): Promise<TodoEntity> {
    const todoDb = this._todoDbSchema.toDbSchema(todo.value);
    await this._dbClient.client.insert(todoTable).values(todoDb);
    return todo;
  }
}
