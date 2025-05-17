import { TodoData } from '@/data/todo/todo.data';

export class MarkTodoUncompletedApp {
  constructor(private readonly _todoData: TodoData) {}

  async execute(input: { todoId: string }): Promise<void> {
    const todo = await this._todoData.getById(input.todoId);
    if (!todo) {
      throw new Error('Todo not found');
    }

    todo.value.completed = false;
    await this._todoData.update(todo);
  }
}
