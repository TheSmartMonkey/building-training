export async function getAllTodos() {
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

export async function createTodo(title: string, description: string, completed: boolean) {
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
