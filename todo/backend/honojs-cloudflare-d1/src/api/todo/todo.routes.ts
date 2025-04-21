import { controller } from '@/middlewares/controller.middleware';
import { route } from '@/middlewares/open-api.middleware';
import { OpenAPIHono } from '@hono/zod-openapi';
import { createTodoInput, createTodoOutput } from './schemas/create-todo.schema';
import { createTodoController } from './todo.contoller';

const todo = new OpenAPIHono();

// todo.openapi(route.get('/user', 'todo'), controller(getAllUserTodosController));
// todo.openapi(
//   route.get('/todoId/{todoId}', 'todo', { input: getTodoByIdInput, output: getTodoByIdOutput }),
//   controller(getTodoByIdController),
// );
todo.openapi(route.post('/', 'todo', { input: createTodoInput, output: createTodoOutput }), controller(createTodoController));
// todo.openapi(
//   route.delete('/todoId/{todoId}', 'todo', { input: deleteTodoInput, output: deleteTodoOutput }),
//   controller(deleteTodoController, { useCustomOutput: true }),
// );
// todo.openapi(route.put('/todoId/{todoId}', 'todo', { input: updateTodoInput, output: updateTodoOutput }), controller(updateTodoController));

export default todo;
