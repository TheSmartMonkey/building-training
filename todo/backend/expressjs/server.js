import express from 'express';
import cors from 'cors';
import { createTodo, deleteTodo, getAllTodos, getTodoById, markTodoCompleted, updateTodo } from './todo.js';

const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.post('/todos', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = await createTodo(title, description);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the todo' });
  }
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await getAllTodos();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('/todos/:todoId', async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const todo = await getTodoById(todoId);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.put('/todos/:todoId', async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const body = req.body;
    const todo = await updateTodo(todoId, body);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.delete('/todos/:todoId', async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const id = await deleteTodo(todoId);
    res.status(200).json(id);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.patch('/todos/:todoId/complete', async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const id = await markTodoCompleted(todoId, true);
    res.status(200).json(id);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.patch('/todos/:todoId/uncomplete', async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const id = await markTodoCompleted(todoId, false);
    res.status(200).json(id);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
});
