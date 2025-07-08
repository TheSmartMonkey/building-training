import todoRoute from '@/api/todo/todo.routes';
import { Hono } from 'hono';

const app = new Hono();

app.route('/todos', todoRoute);

export default app;
