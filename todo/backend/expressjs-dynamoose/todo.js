import { connectToDatabase } from './sqlite/connect.js';
import dynamoose from 'dynamoose';

// Configure Dynamoose to connect to local DynamoDB
dynamoose.aws.sdk.config.update({
  region: 'eu-west-3', // You can use any region
  endpoint: 'http://localhost:8000', // Local DynamoDB endpoint
});

// Define the schema for the todos table
const todoSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true, // Partition key
  },
  title: String,
  description: String,
  completed: Boolean,
});

// Create a model for the todos table
const Todo = dynamoose.model('todos', todoSchema);

export async function getTodoById(id) {
  const db = await connectToDatabase();
  // Purpose: The get method is used to retrieve a single row from a query.
  // It's typically used with SELECT statements when you expect only one result or are interested in fetching only the first row of the result set.
  const todo = await db.get('SELECT * FROM todos WHERE id = ?', [id]);
  return todo;
}

export async function getAllTodos() {
  // Fetch all todos from the DynamoDB table
  const todos = await Todo.scan().exec();
  return todos;
}

export async function createTodo(title, description = '', completed = false) {
  // Create a new todo item
  const newTodo = new Todo({
    id: new Date().getTime().toString(), // Generate a unique ID (you may want to use a better method)
    title,
    description,
    completed,
  });

  await newTodo.save();
  return newTodo;
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
