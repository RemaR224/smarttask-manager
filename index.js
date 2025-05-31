const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = { id: Date.now(), ...req.body };
  tasks.push(task);
  res.status(201).json(task);
});

app.get('/health', (req, res) => {
  res.send('App is healthy');
});

app.listen(3000, () => {
  console.log('SmartTask Manager running on port 3000');
});
