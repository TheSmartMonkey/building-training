import HttpCommon from '../../common/http.common';
import { TodoService } from '../../services/todo.service';
import { useListTodoApp } from './list-todo.app';

export function ListTodoComponent() {
  // Create instances of dependencies
  const httpClient = new HttpCommon();
  const todoService = new TodoService(httpClient);

  // Use the custom hook instead of local state
  const { todos, loading, error, refreshTodos } = useListTodoApp(todoService);

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
        <button onClick={refreshTodos} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Refresh
        </button>
      </div>

      <div id="todo-list" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 my-8">
        {todos.map((todo) => (
          <div
            key={todo.todoId}
            className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{todo.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{todo.description}</p>
            <div className="flex justify-between items-center">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  todo.completed
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}
              >
                {todo.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
