import { connectToDatabase } from './sqlite/connect.js';

export async function getTodoById(id) {
  const db = await connectToDatabase();
  const todo = await db.get('SELECT * FROM todos WHERE id = ?', [id]);
  return todo;
}

export async function getAllTodos() {
  const db = await connectToDatabase();
  const todos = await db.all('SELECT * FROM todos');
  return todos;
}

export async function createTodo(title, description = '', completed = false) {
  const db = await connectToDatabase();
  const result = await db.run(
    'INSERT INTO todos (title, description, completed) VALUES (?, ?, ?)',
    [title, description, completed ? 1 : 0]
  );
  return { id: result.lastID, title, description, completed };
}

export async function updateTodo(id, { title, description, completed }) {
  const db = await connectToDatabase();
  await db.run(
    'UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ?',
    [title, description, completed ? 1 : 0, id]
  );
  return { id, title, description, completed };
}

export async function deleteTodo(id) {
  const db = await connectToDatabase();
  await db.run('DELETE FROM todos WHERE id = ?', [id]);
  return { id };
}

export async function markTodoCompleted(id, completed) {
  const db = await connectToDatabase();
  await db.run('UPDATE todos SET completed = ? WHERE id = ?', [completed ? 1 : 0, id]);
  return { id, completed };
}
