async function createTodo(title) {
  try {
    const response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description: '' }), // You can add description if needed
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newTodo = await response.json();
    console.log('New todo created:', newTodo);
    return newTodo;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
}

async function onFormSubmit(event) {
  event.preventDefault(); // Prevent the form from submitting traditionally
  try {
    const titleInput = document.getElementById('todo-input');
    const title = titleInput.value.trim();

    if (title) {
      const newTodo = await createTodo(title);
      titleInput.value = ''; // Clear the input field
      await initializeTodoList(); // Refresh the todo list
    }
  } catch (error) {
    console.error('Error in form submission:', error);
  }
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
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  form.addEventListener('submit', onFormSubmit);
  initializeTodoList();
});
