import { useCallback, useEffect, useMemo, useState } from 'react';
import HttpCommon from '../../common/http.common';
import { CardComponent } from '../../components/card.component';
import { ChipProps } from '../../components/chip.component';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { ListTodoApp } from './list-todo.app';

export function ListTodoComponent() {
  const httpClient = useMemo(() => new HttpCommon(), []);
  const todoService = useMemo(() => new TodoService(httpClient), [httpClient]);
  const listTodoApp = useMemo(() => new ListTodoApp(todoService), [todoService]);

  const [todos, setTodos] = useState<Todo[]>(listTodoApp.getTodos());
  const [loading, setLoading] = useState<boolean>(listTodoApp.getLoading());
  const [error, setError] = useState<string | null>(listTodoApp.getError());
  const [completedCount, setCompletedCount] = useState<number>(listTodoApp.getCompletedCount());
  const [pendingCount, setPendingCount] = useState<number>(listTodoApp.getPendingCount());

  const syncTodos = useCallback(async () => {
    setTodos(listTodoApp.getTodos());
    setLoading(listTodoApp.getLoading());
    setError(listTodoApp.getError());
    setCompletedCount(listTodoApp.getCompletedCount());
    setPendingCount(listTodoApp.getPendingCount());
  }, [listTodoApp]);

  const refreshTodos = useCallback(async () => {
    await listTodoApp.fetchTodos();
    syncTodos();
  }, [listTodoApp, syncTodos]);

  const handleDeleteTodo = useCallback(
    async (todoId: string) => {
      await listTodoApp.deleteTodo(todoId);
      syncTodos();
    },
    [listTodoApp, syncTodos],
  );

  useEffect(() => {
    refreshTodos();
  }, [refreshTodos]);

  const getCustomChips = (todo: Todo): ChipProps[] => {
    const chips: ChipProps[] = [];
    chips.push({
      label: todo.completed ? 'Completed' : 'Pending',
      variant: todo.completed ? 'success' : 'warning',
      size: 'sm',
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
          />
        ))}
      </div>
    </div>
  );
}
