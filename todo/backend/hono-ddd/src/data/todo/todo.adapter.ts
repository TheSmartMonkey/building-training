import { TodoEntity, TodoEntityFactory } from '@/core/entities/todo.entity';
import { DateValue } from '@/core/values/date.value';
import { UniqueIdValue } from '@/core/values/unique-id.value';
import { InsertDbTodo, SelectDbTodo } from './todo.schema';

export class TodoDataAdapter {
  toDbSchema(todo: TodoEntity): InsertDbTodo {
    return {
      title: todo.value.title,
      description: todo.value.description,
      completed: todo.value.completed,
      todoId: todo.value.todoId.value,
      createdAt: todo.value.createdAt.toISOString(),
      updatedAt: todo.value.updatedAt.toISOString(),
    };
  }

  toEntity(todo: SelectDbTodo): TodoEntity {
    return TodoEntityFactory.create({
      ...todo,
      todoId: new UniqueIdValue(todo.todoId),
      createdAt: new DateValue(new Date(todo.createdAt)),
      updatedAt: new DateValue(new Date(todo.updatedAt)),
    });
  }
}
