import { TodoEntity } from '@/core/entities/todo.entity';

export class TodoData {
  async create(todo: TodoEntity): Promise<TodoEntity> {
    return new TodoEntity({
      title: 'Test',
      description: 'Test',
      completed: false,
      ...todo,
    });
  }
}
