import { TodoFactoryApp } from '@/app/todo/todo-factory.app';
import { TodoEntity } from '@/core/entities/todo.entity';
import { UniqueIdValue } from '@/core/value-object/unique-id.value';
import { CreateTodoInput, CreateTodoOutput } from './schemas/create-todo.schema';

export async function createTodoController({ body }: CreateTodoInput): Promise<CreateTodoOutput> {
  const todo = new TodoEntity({
    todoId: new UniqueIdValue().value,
    name: body.name,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await TodoFactoryApp.createTodo(todo);
  return body;
}
