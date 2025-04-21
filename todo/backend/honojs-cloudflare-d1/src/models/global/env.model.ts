import { z } from 'zod';

export const envVariablesSchema = z.object({
  JWT_SECRET: z.string(),
  DB: z.instanceof(D1Database),
});

export type EnvVariables = z.infer<typeof envVariablesSchema>;
