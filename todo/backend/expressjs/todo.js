import { connectToDatabase } from './sqlite/connect.js';

export async function getTodoById(id) {
  const db = await connectToDatabase();
  // Purpose: The get method is used to retrieve a single row from a query.
  // It's typically used with SELECT statements when you expect only one result or are interested in fetching only the first row of the result set.
  const todo = await db.get('SELECT * FROM todos WHERE id = ?', [id]);
  return todo;
}

export async function getAllTodos() {
  const db = await connectToDatabase();
  // Purpose: The all method is used for SQL queries that return multiple rows of data, such as SELECT queries.
  const todos = await db.all('SELECT * FROM todos');
  return todos;
}

export async function createTodo(title, description = '', completed = false) {
  const db = await connectToDatabase();
  // Purpose: The run method is used to execute SQL queries that do not return data
  // These queries are usually for modifying the database, such as INSERT, UPDATE, DELETE, or CREATE TABLE statements.
  const result = await db.run('INSERT INTO todos (title, description, completed) VALUES (?, ?, ?)', [
    title,
    description,
    completed ? 1 : 0,
  ]);
  return { id: result.lastID, title, description, completed };
}

export async function updateTodo(id, { title, description, completed }) {
  const db = await connectToDatabase();
  await db.run('UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ?', [title, description, completed ? 1 : 0, id]);
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
