import { Hono } from 'hono';

const todoRoute = new Hono();

todoRoute.get('/', (c) => {
  return c.text('Hello Hono!');
});

export default todoRoute;
