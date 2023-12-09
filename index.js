const express = require('express');
const PORT = 8000;

const app = express();

app.use(express.json());

let tasks = [
  { id: 1, name: 'Task 1', description: 'Description 1', status: 'Incomplete' },
  { id: 2, name: 'Task 2', description: 'Description 2', status: 'Incomplete' },
];

app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});
app.post('/tasks', (req, res) => {
  const { name, description, status } = req.body;
  const newTask = {
    id: tasks.length + 1,
    name,
    description,
    status,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    res
      .status(200)
      .json({ task: tasks[taskIndex], message: 'successfully edited' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.json({ message: 'tasks deleted sucessfully' });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
