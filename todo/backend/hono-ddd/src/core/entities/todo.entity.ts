import { DateValue } from '@/core/values/date.value';
import { UniqueIdValue } from '@/core/values/unique-id.value';
import { SelectDbTodo } from '@/data/todo/todo.schema';

export class TodoEntity {
  constructor(private readonly _value: Todo) {}

  get value() {
    return this._value;
  }
}

type Todo = Omit<SelectDbTodo, 'todoId' | 'createdAt' | 'updatedAt'> & {
  todoId: UniqueIdValue;
  createdAt: DateValue;
  updatedAt: DateValue;
};
