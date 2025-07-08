import { controller } from '@/middlewares/controller.middleware';
import { Hono } from 'hono';
import { TodoController } from './todo.controller';

const todoRoute = new Hono();

todoRoute.post('/', controller(TodoController.createTodo));
todoRoute.get('/', controller(TodoController.getAllTodo));
todoRoute.get('/:todoId', controller(TodoController.getTodoById));
todoRoute.delete('/:todoId', controller(TodoController.deleteTodo));
todoRoute.put('/:todoId', controller(TodoController.updateTodo));
todoRoute.patch('/:todoId/complete', controller(TodoController.markTodoCompleted));
todoRoute.patch('/:todoId/uncomplete', controller(TodoController.markTodoUncompleted));

export default todoRoute;
