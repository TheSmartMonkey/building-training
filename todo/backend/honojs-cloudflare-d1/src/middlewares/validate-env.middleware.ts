import { EnvManager } from '@/common/env';
import { logger } from '@/common/logger';
import { EnvVariables, envVariablesSchema } from '@/models/global/env.model';
import { InternalServerError } from '@/models/global/http.model';
import { Context, Next } from 'hono';

export async function envMiddleware(c: Context, next: Next): Promise<any> {
  validateEnvVariables(c.env);
  await next();
}

function validateEnvVariables(env: EnvVariables): void {
  if (EnvManager.value) return;
  const result = envVariablesSchema.safeParse(env);
  if (!result.success) {
    logger.error(result.error.message);
    throw new InternalServerError('ENV_VARIABLES_VALIDATION');
  }
  EnvManager.value = result.data;
}
