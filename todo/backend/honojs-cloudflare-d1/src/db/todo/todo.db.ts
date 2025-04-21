import { TodoEntity } from '@/core/entities/todo.entity';
import { CloudflareD1Db } from '../cloudflare-d1';
import { TodoDbSchema, todoTable } from './todo.schema';

export class TodoDb {
  constructor(
    private readonly _db: CloudflareD1Db,
    private readonly _todoDbSchema: TodoDbSchema,
  ) {}

  async createTodo(todo: TodoEntity): Promise<void> {
    const todoDb = this._todoDbSchema.toDbSchema(todo.value);
    await this._db.client.insert(todoTable).values(todoDb);
  }
}
