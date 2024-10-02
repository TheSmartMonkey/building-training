import { connectToDatabase } from './sqlite/connect.js';

export function getTodoById() {
  return;
}

export async function getAllTodos() {
  const db = await connectToDatabase();
  const response = await db.run('SELECT * FROM todos');
  console.log(response);
  return response;
}

export async function createTodo(title, description = '') {
  try {
    const db = await connectToDatabase();
    const response = await db.run('INSERT INTO todos (title, description) VALUES (?, ?)', [title, description]);
    console.log(response);
    return response;
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
