import { z } from 'zod';

export const createTodoBody = z.object({
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
});

export type CreateTodoBody = z.infer<typeof createTodoBody>;
