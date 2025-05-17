import { useEffect, useState } from 'react';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

export function useListTodoApp(todoService: TodoService) {
  const [todos, setTodos] = useState<Todo[]>([
    { todoId: 1, title: 'Learn React', description: 'Learn React', completed: false },
    { todoId: 2, title: 'Build a Todo App', description: 'Build a Todo App', completed: false },
    { todoId: 3, title: 'Master TypeScript', description: 'Master TypeScript', completed: true },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTodos = await todoService.getAllTodos();
      setTodos(fetchedTodos);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load todos on initial mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    loading,
    error,
    refreshTodos: fetchTodos,
  };
}
