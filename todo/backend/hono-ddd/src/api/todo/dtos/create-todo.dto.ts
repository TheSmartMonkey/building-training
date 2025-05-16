import { TodoEntity } from '@/core/entities/todo.entity';
import { z } from 'zod';

export const createTodoInput = z.object({
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
});

export class CreateTodoDto {
  static toOutput(entity: TodoEntity): CreateTodoOutput {
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

export type CreateTodoInput = z.infer<typeof createTodoInput>;
export type CreateTodoOutput = {
  todoId: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};
