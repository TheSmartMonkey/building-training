import HttpCommon from '../common/http.common';
import { Todo } from '../models/todo.model';

export class TodoService {
  private readonly BASE_URL = 'http://localhost:3000/todos';

  constructor(private readonly _http: HttpCommon) {}

  async getAllTodos() {
    return this._http.get(this.BASE_URL);
  }

  async createTodo(todo: Todo) {
    return this._http.post(this.BASE_URL, todo);
  }
}
