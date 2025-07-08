import { useCallback, useEffect, useMemo, useState } from 'react';
import HttpCommon from '../common/http.common';
import { CardComponent } from '../components/card.component';
import { ChipProps } from '../components/chip.component';
import { PopupComponent } from '../components/popup.component';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';
import { UdpateTodoPopupComponent } from './update-todo-popup.component';

export function ListTodoComponent() {
  const httpClient = useMemo(() => new HttpCommon(), []);
  const todoService = useMemo(() => new TodoService(httpClient), [httpClient]);

  // State management (previously in ListTodoApp)
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState<boolean>(false);

  // Computed values (previously getter methods in ListTodoApp)
  const completedTodos = useMemo(() => todos.filter((todo) => todo.completed), [todos]);
  const pendingTodos = useMemo(() => todos.filter((todo) => !todo.completed), [todos]);
  const completedCount = useMemo(() => completedTodos.length, [completedTodos]);
  const pendingCount = useMemo(() => pendingTodos.length, [pendingTodos]);

  // Business logic methods (previously in ListTodoApp)
  const fetchTodos = useCallback(async (): Promise<void> => {
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
  }, [todoService]);

  const deleteTodo = useCallback(
    async (todoId: string): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        await todoService.deleteTodo(todoId);
        // Remove the todo from the local state
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.todoId !== todoId));
      } catch (err) {
        setError('Failed to delete todo');
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [todoService],
  );

  const updateTodo = useCallback(
    async (todoId: string, updatedTodo: Todo): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        await todoService.updateTodo(todoId, updatedTodo);
        // Update the todo in the local state
        setTodos((prevTodos) => prevTodos.map((todo) => (todo.todoId === todoId ? updatedTodo : todo)));
      } catch (err) {
        setError('Failed to update todo');
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [todoService],
  );

  const refreshTodos = useCallback(async () => {
    await fetchTodos();
  }, [fetchTodos]);

  const handleDeleteTodo = useCallback(
    async (todoId: string) => {
      await deleteTodo(todoId);
    },
    [deleteTodo],
  );

  const handleUpdateTodo = useCallback(async (todo: Todo) => {
    setEditingTodo(todo);
    setIsEditPopupOpen(true);
  }, []);

  const handleSaveTodo = useCallback(
    async (updatedTodo: Todo) => {
      await updateTodo(updatedTodo.todoId, updatedTodo);
      setIsEditPopupOpen(false);
      setEditingTodo(null);
    },
    [updateTodo],
  );

  const handleCancelEdit = useCallback(() => {
    setIsEditPopupOpen(false);
    setEditingTodo(null);
  }, []);

  useEffect(() => {
    refreshTodos();
  }, [refreshTodos]);

  const getCustomChips = (todo: Todo): ChipProps[] => {
    const chips: ChipProps[] = [];
    chips.push({
      label: todo.completed ? 'Completed' : 'Pending',
      variant: todo.completed ? 'success' : 'warning',
    });

    return chips;
  };

  if (loading) {
    return <div className="text-center py-4">Loading todos...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        {error}
        <button onClick={refreshTodos} className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Todos</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            <span className="mr-2">Completed: {completedCount}</span>
            <span>Pending: {pendingCount}</span>
          </div>
          <button onClick={refreshTodos} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Refresh
          </button>
        </div>
      </div>

      <div id="todo-list" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 my-8">
        {todos.map((todo) => (
          <CardComponent
            key={todo.todoId}
            title={todo.title}
            description={todo.description}
            completed={todo.completed}
            chips={getCustomChips(todo)}
            onDelete={() => handleDeleteTodo(todo.todoId)}
            onUpdate={() => handleUpdateTodo(todo)}
          />
        ))}
      </div>

      {/* Edit Todo Popup */}
      <PopupComponent isOpen={isEditPopupOpen} onClose={handleCancelEdit} title="Edit Todo" showActions={false}>
        <UdpateTodoPopupComponent todo={editingTodo} onSave={handleSaveTodo} onCancel={handleCancelEdit} />
      </PopupComponent>
    </div>
  );
}
