const express = require('express');
const app = express();
const PORT = 3000;

// Route
app.get('/', (req, res) => {
  res.send('Hello, Chandan!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
