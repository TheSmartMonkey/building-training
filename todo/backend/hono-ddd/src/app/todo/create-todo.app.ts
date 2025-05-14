import { CreateTodoBody } from '@/api/todo/schemas/create-todo.schema';
import { TodoEntity } from '@/core/entities/todo.entity';
import { DateValue } from '@/core/values/date.value';
import { UniqueIdValue } from '@/core/values/unique-id.value';
import { TodoData } from '@/data/todo/todo.data';

export class CreateTodoApp {
  constructor(private readonly _todoData: TodoData) {}

  async execute(body: CreateTodoBody): Promise<TodoEntity> {
    const todo = new TodoEntity({
      todoId: new UniqueIdValue(),
      title: body.title,
      description: body.description,
      completed: body.completed,
      createdAt: new DateValue(),
      updatedAt: new DateValue(),
    });
    return this._todoData.create(todo);
  }
}
