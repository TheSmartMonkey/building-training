import { TodoData } from '@/data/todo/todo.data';

export class DeleteTodoApp {
  constructor(private readonly _todoData: TodoData) {}

  async execute(input: { todoId: string }): Promise<void> {
    await this._todoData.delete(input.todoId);
  }
}
