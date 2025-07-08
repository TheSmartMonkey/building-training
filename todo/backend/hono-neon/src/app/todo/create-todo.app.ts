import { CreateTodoInput } from '@/api/todo/dtos/create-todo.dto';
import { TodoApiAdapter, TodoOutput } from '@/api/todo/todo.adapter';
import { TodoEntityFactory } from '@/core/entities/todo.entity';
import { TodoData } from '@/data/todo/todo.data';

export class CreateTodoApp {
  constructor(private readonly _todoData: TodoData) {}

  async execute(input: CreateTodoInput): Promise<TodoOutput> {
    const todo = TodoEntityFactory.create(input);
    await this._todoData.create(todo);
    return TodoApiAdapter.toOutput(todo);
  }
}
