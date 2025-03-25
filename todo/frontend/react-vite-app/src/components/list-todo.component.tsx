import { useState } from 'react';

export function ListTodoComponent() {
  // Define the Todo type
  interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }

  // Initialize todos state with some example items
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Master TypeScript', completed: false },
  ]);

  return (
    <div className="container">
      <h1>Todo List</h1>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {
                setTodos(todos.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t)));
              }}
            />
            <span>{todo.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
