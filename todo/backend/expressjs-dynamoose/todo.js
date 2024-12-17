import dynamoose from 'dynamoose';

// dynamoose.aws.sdk.config.update({
//   region: 'eu-west-3',
// });

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
  // Fetch a single todo by ID from the DynamoDB table
  const todo = await Todo.get(id);
  return todo;
}

export async function getAllTodos() {
  // Fetch all todos from the DynamoDB table
  const todos = await Todo.scan().exec();
  console.log(todos);
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
  // Update an existing todo item
  const updatedTodo = await Todo.update({ id }, { title, description, completed });
  return updatedTodo;
}

export async function deleteTodo(id) {
  // Delete a todo item by ID
  await Todo.delete(id);
  return { id };
}

export async function markTodoCompleted(id, completed) {
  // Update the completed status of a todo item
  const updatedTodo = await Todo.update({ id }, { completed });
  return updatedTodo;
}
