import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

export class ListTodoApp {
  private todos: Todo[] = [];
  private loading: boolean = false;
  private error: string | null = null;

  constructor(private todoService: TodoService) {}

  // State getters
  getTodos(): Todo[] {
    return this.todos;
  }

  getLoading(): boolean {
    return this.loading;
  }

  getError(): string | null {
    return this.error;
  }

  getCompletedTodos(): Todo[] {
    return this.todos.filter((todo) => todo.completed);
  }

  getPendingTodos(): Todo[] {
    return this.todos.filter((todo) => !todo.completed);
  }

  getCompletedCount(): number {
    return this.getCompletedTodos().length;
  }

  getPendingCount(): number {
    return this.getPendingTodos().length;
  }

  async fetchTodos(): Promise<void> {
    try {
      this.loading = true;
      this.error = null;
      const fetchedTodos = await this.todoService.getAllTodos();
      this.todos = fetchedTodos;
    } catch (err) {
      this.error = 'Failed to fetch todos';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }
}
