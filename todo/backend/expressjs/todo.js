import { connectToDatabase } from './sqlite/connect.js';

export function getTodoById() {
  return;
}

export async function getAllTodos() {
  const db = await connectToDatabase();
  return db.run('SELECT * FROM todos');
}

export async function createTodo(title, description = '') {
  try {
    const db = await connectToDatabase();

    // The table creation is now handled in init.js, so we can remove it from here

    // Insert the new todo
    const result = await db.run('INSERT INTO todos (title, description) VALUES (?, ?)', [title, description]);

    return {
      id: result.lastID,
      title,
      description,
      completed: false,
      created_at: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
}

export function updateTodo() {
  return;
}

export function deleteTodo() {
  return;
}
