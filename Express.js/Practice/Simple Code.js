
  // Import express
  const express = require('express');
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON
  app.use(express.json());

  // Route
  app.get('/', (req, res) => {
    res.send('Hello, Chandan!');
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
