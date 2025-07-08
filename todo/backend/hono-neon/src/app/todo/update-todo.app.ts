import { UpdateTodoInput } from '@/api/todo/dtos/update-todo.dto';
import { TodoData } from '@/data/todo/todo.data';
export class UpdateTodoApp {
  constructor(private readonly _todoData: TodoData) {}

  async execute(todoId: string, input: UpdateTodoInput): Promise<void> {
    const todo = await this._todoData.getById(todoId);
    if (!todo) {
      throw new Error('Todo not found');
    }

    todo.value.title = input.title ?? todo.value.title;
    todo.value.description = input.description ?? todo.value.description;
    todo.value.completed = input.completed ?? todo.value.completed;
    await this._todoData.update(todo);
  }
}
