import { useState } from 'react';
import { Todo } from '../models/todo.model';

export function ListTodoComponent() {
  const [todos] = useState<Todo[]>([
    { todoId: 1, title: 'Learn React', description: 'Learn React', completed: false },
    { todoId: 2, title: 'Build a Todo App', description: 'Build a Todo App', completed: false },
    { todoId: 3, title: 'Master TypeScript', description: 'Master TypeScript', completed: true },
  ]);

  return (
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
  );
}
