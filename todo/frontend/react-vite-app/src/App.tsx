import React from 'react';
import './App.css';
import { CreateTodoComponent } from './features/create-todo/create-todo.component';
import { ListTodoComponent } from './features/list-todo/list-todo.components';

interface InputProps {
  characterLimit: number;
}

class Input extends React.Component<InputProps> {
  constructor(props: InputProps) {
    super(props);
    // Bind the handleChange method to this instance
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length > this.props.characterLimit) {
      alert('Character limit exceeded');
    }
  }

  render() {
    return <input onChange={this.handleChange} placeholder="Enter some text" />;
  }
}

function App() {
  return (
    <div>
      <h1>Todo App</h1>

      <section>
        <h1>Character Limit</h1>
        <Input characterLimit={20} />
      </section>

      <CreateTodoComponent />

      <ListTodoComponent />
    </div>
  );
}

export default App;
