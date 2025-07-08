import { TodoData } from '@/data/todo/todo.data';

export class MarkTodoCompletedApp {
  constructor(private readonly _todoData: TodoData) {}

  async execute(input: { todoId: string }): Promise<void> {
    const todo = await this._todoData.getById(input.todoId);
    if (!todo) {
      throw new Error('Todo not found');
    }

    todo.value.completed = true;
    await this._todoData.update(todo);
  }
}
