async function onFormSubmit() {
  console.log('Submited form !');
}

async function getAllTodos() {
  try {
    const response = await fetch('http://localhost:3000/todos');
    const todos = await response.json();
    console.log({ todos });
    return todos;
  } catch (error) {
    console.error('Error:', error);
  }
}

function TodoListComponent(todos) {
  console.log('TodoListComponent: ', todos);
  const listOftodos = todos.map((todo) => TodoComponent(todo));
  return '<ul>' + listOftodos.join('') + '</ul>';
}

function TodoComponent(todo) {
  return `<li>${JSON.stringify(todo)}</li>`;
}

async function initializeTodoList() {
  try {
    const todos = await getAllTodos();
    console.log({ initTodos: todos });
    const todoListComponent = TodoListComponent(todos);
    const todoListElement = document.getElementById('todo-list');
    todoListElement.innerHTML = todoListComponent;
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeTodoList);
