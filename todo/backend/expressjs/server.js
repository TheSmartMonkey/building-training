import express from 'express';

const port = 3000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.post('/todo', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = await createTodo(title, description);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the todo' });
  }
});

app.get('/todo', async (req, res) => {
  try {
    const todos = await getAllTodos();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while getting all the todo' });
  }
});

app.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
});
