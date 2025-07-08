import { DateValue } from '@/core/values/date.value';
import { UniqueIdValue } from '@/core/values/unique-id.value';
export class TodoEntity {
  constructor(private readonly _value: Todo) {}

  get value() {
    return this._value;
  }
}

export class TodoEntityFactory {
  static create(todo: PartialTodo): TodoEntity {
    return new TodoEntity({
      todoId: new UniqueIdValue(),
      createdAt: new DateValue(),
      updatedAt: new DateValue(),
      ...todo,
    });
  }

  static fake(partial?: Partial<TodoEntity>): TodoEntity {
    return new TodoEntity({
      todoId: new UniqueIdValue(),
      createdAt: new DateValue(),
      updatedAt: new DateValue(),
      title: 'fakeTitle',
      description: 'fakeDescription',
      completed: false,
      ...partial,
    });
  }
}

type Todo = {
  todoId: UniqueIdValue;
  title: string;
  description: string;
  completed: boolean;
  createdAt: DateValue;
  updatedAt: DateValue;
};

type PartialTodo = {
  todoId?: UniqueIdValue;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: DateValue;
  updatedAt?: DateValue;
};
