import './App.css';
import { CreateTodoComponent } from './features/create-todo/create-todo.component';
import { ListTodoComponent } from './features/list-todo/list-todo.component';

function App() {
  return (
    <div>
      <h1>Todo App</h1>
      <CreateTodoComponent />
      <ListTodoComponent />
    </div>
  );
}

export default App;
