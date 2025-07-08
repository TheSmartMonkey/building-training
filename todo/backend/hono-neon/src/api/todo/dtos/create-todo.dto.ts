import { z } from 'zod';

export const createTodoInput = z.object({
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
});

export type CreateTodoInput = z.infer<typeof createTodoInput>;
export type CreateTodoOutput = {
  todoId: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};
