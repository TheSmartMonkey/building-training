import { CreateTodoInput } from '@/api/todo/schemas/create-todo.schema';
import { TodoEntity } from '@/core/entities/todo.entity';
import { UniqueIdValue } from '@/core/value-object/unique-id.value';
import { TodoDb } from '@/db/todo/todo.db';

export class CreateTodoApp {
  constructor(private readonly _todoDb: TodoDb) {}

  async execute(input: CreateTodoInput['body']): Promise<void> {
    const todo = new TodoEntity({
      todoId: new UniqueIdValue().value,
      name: input.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this._todoDb.createTodo(todo);
  }
}
