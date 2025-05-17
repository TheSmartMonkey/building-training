import { Hono } from 'hono';
import { TodoController } from './todo.controller';

const todoRoute = new Hono();

todoRoute.post('/', TodoController.createTodo);
todoRoute.get('/', TodoController.getAllTodo);
todoRoute.get('/:todoId', TodoController.getTodoById);
todoRoute.delete('/:todoId', TodoController.deleteTodo);
todoRoute.put('/:todoId', TodoController.updateTodo);
todoRoute.patch('/:todoId/complete', TodoController.markTodoCompleted);
todoRoute.patch('/:todoId/uncomplete', TodoController.markTodoUncompleted);

export default todoRoute;
