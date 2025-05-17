import { TodoEntity } from '@/core/entities/todo.entity';
import { TodoData } from '@/data/todo/todo.data';

export class GetTodoByIdApp {
  constructor(private readonly _todoData: TodoData) {}

  async execute(input: { todoId: string }): Promise<TodoEntity> {
    const todo = await this._todoData.getById(input.todoId);
    if (!todo) {
      throw new Error('Todo not found');
    }
    return todo;
  }
}
