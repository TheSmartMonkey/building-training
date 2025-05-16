import { CreateTodoInput } from '@/api/todo/dtos/create-todo.dto';
import { TodoEntity, TodoEntityFactory } from '@/core/entities/todo.entity';
import { TodoData } from '@/data/todo/todo.data';

export class CreateTodoApp {
  constructor(private readonly _todoData: TodoData) {}

  async execute(input: CreateTodoInput): Promise<TodoEntity> {
    const todo = TodoEntityFactory.create(input);
    return this._todoData.create(todo);
  }
}
