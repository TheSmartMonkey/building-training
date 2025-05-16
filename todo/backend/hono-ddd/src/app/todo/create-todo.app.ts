import { CreateTodoInput } from '@/api/todo/dtos/create-todo.dto';
import { TodoEntity } from '@/core/entities/todo.entity';
import { DateValue } from '@/core/values/date.value';
import { UniqueIdValue } from '@/core/values/unique-id.value';
import { TodoData } from '@/data/todo/todo.data';

export class CreateTodoApp {
  constructor(private readonly _todoData: TodoData) {}

  async execute(input: CreateTodoInput): Promise<TodoEntity> {
    const todo = new TodoEntity({
      todoId: new UniqueIdValue(),
      title: input.title,
      description: input.description,
      completed: input.completed,
      createdAt: new DateValue(),
      updatedAt: new DateValue(),
    });
    return this._todoData.create(todo);
  }
}
