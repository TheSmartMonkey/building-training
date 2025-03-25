import './App.css';
import { CreateTodoComponent } from './components/create-todo.component';

function App() {
  return (
    <div>
      <h1>Todo App</h1>

      <CreateTodoComponent />

      {/* <div id="todo-list">
        {todos.map((todo, index) => (
          <div key={index}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>Status: {todo.completed ? 'Completed' : 'Pending'}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default App;
