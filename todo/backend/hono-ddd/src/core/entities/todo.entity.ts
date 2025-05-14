export class TodoEntity {
  constructor(private readonly _value: Todo) {}

  get value() {
    return this._value;
  }
}

type Todo = {
  title: string;
  description: string;
  completed: boolean;
};
