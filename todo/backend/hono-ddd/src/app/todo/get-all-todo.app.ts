import { TodoEntity } from '@/core/entities/todo.entity';
import { TodoData } from '@/data/todo/todo.data';

export class GetAllTodoApp {
  constructor(private readonly _todoData: TodoData) {}

  async execute(): Promise<TodoEntity[]> {
    return this._todoData.getAll();
  }
}
