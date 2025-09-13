const express = require('express');
const app = express();
const PORT = 3000;

// GET route
app.get('/', (req, res) => {
  res.send('Home Page');
});

// POST route
app.post('/submit', (req, res) => {
  res.send('Form Submitted!');
});

// PUT route with parameter
app.put('/user/:id', (req, res) => {
  res.send(`User ${req.params.id} updated`);
});

// DELETE route
app.delete('/user/:id', (req, res) => {
  res.send(`User ${req.params.id} deleted`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
