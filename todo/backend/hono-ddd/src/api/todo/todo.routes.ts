import { Hono } from 'hono';
import { TodoController } from './todo.controller';

const todoRoute = new Hono();

todoRoute.post('/', TodoController.createTodo);

export default todoRoute;
