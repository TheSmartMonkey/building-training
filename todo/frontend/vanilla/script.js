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
    <li class="todo-item ${todo.completed ? 'completed' : ''}">
      <div class="todo-item-header">
        <button class="edit-btn" data-id="${todo.todoId}">✏️</button> <!-- Pencil icon -->
        <input type="text" class="edit-title" placeholder="Edit title" value="${todo.title}" style="display: none;" />
        <strong class="todo-title" style="display: inline;">${todo.title}</strong>
        <button class="delete-btn" data-id="${todo.todoId}">×</button>
      </div>
      <div class="todo-item-content">
        <textarea class="edit-description" placeholder="Edit description" style="display: none;">${todo.description || ''}</textarea>
        <p class="todo-description" style="display: inline;">${todo.description || 'No description'}</p>
        <br>
        <br>
        <label style="display: inline;">
          <input type="checkbox" class="edit-completed" ${todo.completed ? 'checked' : ''} />
          Completed
        </label>
      </div>
      <button class="save-btn" data-id="${todo.todoId}" style="display: none;">Save</button>
    </li>
  `;
}

async function deleteTodo(todoId) {
  try {
    const response = await fetch(`http://localhost:3000/todos/${todoId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('Todo deleted:', todoId);
    return todoId;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
}

async function updateTodo(todoId, title, description, completed) {
  try {
    const response = await fetch(`http://localhost:3000/todos/${todoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, completed }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedTodo = await response.json();
    console.log('Todo updated:', updatedTodo);
    return updatedTodo;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
}

async function initializeTodoList() {
  try {
    const todos = await getAllTodos();
    console.log({ initTodos: todos });
    const todoListComponent = TodoListComponent(todos);
    const todoListElement = document.getElementById('todo-list');
    todoListElement.innerHTML = todoListComponent;

    // Add event listeners for delete buttons
    const deleteButtons = todoListElement.querySelectorAll('.delete-btn');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        console.log({ event });
        const todoId = event.target.dataset.id;
        await deleteTodo(todoId);
        await initializeTodoList(); // Refresh the list after deletion
      });
    });

    // Add event listeners for edit buttons
    const editButtons = todoListElement.querySelectorAll('.edit-btn');
    editButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const todoItem = button.closest('.todo-item');
        const editTitle = todoItem.querySelector('.edit-title');
        const editDescription = todoItem.querySelector('.edit-description');
        const saveButton = todoItem.querySelector('.save-btn');
        const todoTitle = todoItem.querySelector('.todo-title');
        const todoDescription = todoItem.querySelector('.todo-description');
        const editCompleted = todoItem.querySelector('.edit-completed');

        // Toggle visibility
        if (editTitle.style.display === 'none') {
          editTitle.style.display = 'inline';
          editDescription.style.display = 'inline';
          saveButton.style.display = 'inline';
          todoTitle.style.display = 'none';
          todoDescription.style.display = 'none';
          editCompleted.style.display = 'inline'; // Show the checkbox
        } else {
          editTitle.style.display = 'none';
          editDescription.style.display = 'none';
          saveButton.style.display = 'none';
          todoTitle.style.display = 'inline';
          todoDescription.style.display = 'inline';
          editCompleted.style.display = 'none'; // Hide the checkbox
        }
      });
    });

    // Add event listeners for save buttons
    const saveButtons = todoListElement.querySelectorAll('.save-btn');
    saveButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        const todoId = event.target.dataset.id;
        const todoItem = button.closest('.todo-item');
        const newTitle = todoItem.querySelector('.edit-title').value;
        const newDescription = todoItem.querySelector('.edit-description').value;
        const newCompleted = todoItem.querySelector('.edit-completed').checked; // Get the updated completed status

        await updateTodo(todoId, newTitle, newDescription, newCompleted);
        await initializeTodoList(); // Refresh the list after updating
      });
    });
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
