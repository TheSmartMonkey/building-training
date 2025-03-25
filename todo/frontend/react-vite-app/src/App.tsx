import { useState } from 'react';
import './App.css';
import { Todo } from './models/todo.model';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTodos([...todos, formData]);
    setFormData({ title: '', description: '', completed: false });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [id.replace('todo-', '')]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div>
      <h1>Todo App</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="todo-title">Title:</label>
          <input type="text" id="todo-title" value={formData.title} onChange={handleInputChange} placeholder="Enter a new todo" required />
        </div>
        <div>
          <label htmlFor="todo-description">Description:</label>
          <textarea
            id="todo-description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter description (optional)"
          />
        </div>
        <div>
          <label htmlFor="todo-completed">Completed:</label>
          <input type="checkbox" id="todo-completed" checked={formData.completed} onChange={handleInputChange} />
        </div>
        <br />
        <button type="submit">Add Todo</button>
      </form>

      <div id="todo-list">
        {todos.map((todo, index) => (
          <div key={index}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>Status: {todo.completed ? 'Completed' : 'Pending'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
