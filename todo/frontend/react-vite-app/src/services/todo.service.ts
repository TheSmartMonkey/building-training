import HttpCommon from '../common/http.common';

export class TodoService {
  private readonly BASE_URL = 'http://localhost:3000/todos';

  constructor(private readonly _http: HttpCommon) {}

  async getAllTodos() {
    return this._http.get(this.BASE_URL);
  }

  async createTodo(title: string, description: string, completed: boolean) {
    return this._http.post(this.BASE_URL, {
      title,
      description,
      completed,
    });
  }
}
