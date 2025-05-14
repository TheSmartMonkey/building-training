import { z } from 'zod';

export const createTodoBody = z.object({
  title: z.string(),
  description: z.string(),
});

export type CreateTodoBody = z.infer<typeof createTodoBody>;
