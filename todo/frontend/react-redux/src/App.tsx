import { useCallback, useState } from 'react';
import './App.css';
import { CreateTodoComponent } from './features/create-todo.component';
import { ListTodoComponent } from './features/list-todo.component';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTodoCreated = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <div>
      <h1>Todo App</h1>
      <CreateTodoComponent onTodoCreated={handleTodoCreated} />
      <ListTodoComponent key={refreshKey} />
    </div>
  );
}

export default App;
