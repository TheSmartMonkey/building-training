async function createTodo(title, description, completed) {
  try {
    const response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, completed }),
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
    const descriptionInput = document.getElementById('todo-description');
    const completedSwitch = document.getElementById('todo-completed');

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const completed = completedSwitch.checked;

    if (title) {
      await createTodo(title, description, completed);
      titleInput.value = ''; // Clear the title input field
      descriptionInput.value = ''; // Clear the description input field
      completedSwitch.checked = false; // Reset the completed switch
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
    return [];
  }
}

function TodoListComponent(todos) {
  console.log('TodoListComponent: ', todos);
  if (!todos || todos.length === 0) {
    return '<p>No todos available.</p>';
  }
  const listOfTodos = todos.map((todo) => TodoComponent(todo));
  return '<ul>' + listOfTodos.join('<br>') + '</ul>';
}

function TodoComponent(todo) {
  return `
    <li>
      <strong>${todo.title}</strong>
      <p>${todo.description || 'No description'}</p>
      <span>Status: ${todo.completed ? 'Completed' : 'Pending'}</span>
    </li>
  `;
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
