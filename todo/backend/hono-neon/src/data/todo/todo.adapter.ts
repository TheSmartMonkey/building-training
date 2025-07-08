import { TodoEntity, TodoEntityFactory } from '@/core/entities/todo.entity';
import { DateValue } from '@/core/values/date.value';
import { UniqueIdValue } from '@/core/values/unique-id.value';
import { InsertDbTodo, SelectDbTodo } from './todo.schema';

export class TodoDataAdapter {
  toSchema(todo: TodoEntity): InsertDbTodo {
    return {
      title: todo.value.title,
      description: todo.value.description,
      completed: todo.value.completed,
      todoId: todo.value.todoId.value,
      createdAt: todo.value.createdAt.toDate(),
      updatedAt: todo.value.updatedAt.toDate(),
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
