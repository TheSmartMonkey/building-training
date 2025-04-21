import { SelectDbTodo } from '@/db/todo/todo.schema';

type Todo = Omit<SelectDbTodo, 'createdAt' | 'updatedAt'> & {
  createdAt: Date;
  updatedAt: Date;
};

export class TodoEntity {
  constructor(private _value: Todo) {}

  get value(): Todo {
    return this._value;
  }
}
