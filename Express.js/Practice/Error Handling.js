
  app.get('/user/:id', async (req, res, next) => {
    try {
      // Example: simulate DB error
      if (req.params.id === '0') {
        throw new Error('Invalid User ID');
      }
      res.send(`User ID: ${req.params.id}`);
    } catch (error) {
      console.log(error);
      next(error); // Pass error to middleware
    }
  });
