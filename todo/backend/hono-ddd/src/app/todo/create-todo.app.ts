import { CreateTodoBody } from '@/api/todo/schemas/create-todo.schema';
import { TodoEntity } from '@/core/entities/todo.entity';
import { TodoData } from '@/data/todo/todo.data';

export class CreateTodoApp {
  constructor(private readonly _todoData: TodoData) {}

  async execute(body: CreateTodoBody): Promise<TodoEntity> {
    const todoEntity = new TodoEntity({
      title: body.title,
      description: body.description,
      completed: false,
    });
    return this._todoData.create(todoEntity);
  }
}
