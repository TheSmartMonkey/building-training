import { OpenAPIHono } from '@hono/zod-openapi';
import { logger } from './common/logger';
import { errorHandler } from './middlewares/error-handler.middleware';
import { jwtMiddleware } from './middlewares/jwt.middleware';
import { envMiddleware } from './middlewares/validate-env.middleware';
import { EnvVariables } from './models/global/env.model';
import routes from './routes';

const app = new OpenAPIHono<{ Bindings: EnvVariables }>();

// Middlewares
app.onError(errorHandler);
app.use('*', jwtMiddleware);
app.use(envMiddleware);

app.route('/', routes);

logger.info('Api: http://127.0.0.1:8787');

export default app;
