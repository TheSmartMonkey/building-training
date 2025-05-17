import './App.css';
import { CreateTodoComponent } from './components/create-todo.component';
import { ListTodoComponent } from './components/list-todo.component';
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
