import HttpCommon from '../common/http.common';
import { CreateTodoInput, Todo } from '../models/todo.model';

export class TodoService {
  private readonly BASE_URL = 'http://localhost:3000/todos';

  constructor(private readonly _http: HttpCommon) {}

  async getAllTodos(): Promise<Todo[]> {
    return this._http.get(this.BASE_URL);
  }

  async createTodo(todo: CreateTodoInput): Promise<void> {
    await this._http.post(this.BASE_URL, todo);
  }

  async deleteTodo(todoId: string): Promise<void> {
    await this._http.delete(`${this.BASE_URL}/${todoId}`);
  }

  async updateTodo(todoId: string, todo: Todo): Promise<void> {
    await this._http.put(`${this.BASE_URL}/${todoId}`, todo);
  }
}
