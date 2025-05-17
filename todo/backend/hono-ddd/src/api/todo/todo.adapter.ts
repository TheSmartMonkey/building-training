import { TodoEntity } from '@/core/entities/todo.entity';

export class TodoApiAdapter {
  static toOutput(entity: TodoEntity): TodoOutput {
    const value = entity.value;
    return {
      todoId: value.todoId.value,
      title: value.title,
      description: value.description,
      completed: value.completed,
      createdAt: value.createdAt.toISOString(),
      updatedAt: value.updatedAt.toISOString(),
    };
  }
}

export type TodoOutput = {
  todoId: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};
