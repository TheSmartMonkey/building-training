import { OpenAPIHono } from '@hono/zod-openapi';
import todo from './api/todo/todo.routes';

const app = new OpenAPIHono();

// Public routes

// Auth routes
app.route('/todo', todo);

export default app;
