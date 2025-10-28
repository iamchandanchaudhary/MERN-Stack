const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// MongoDB connection URL
const mongoURI = 'mongodb://localhost:27017/mydatabase';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Create a Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

// Create a Model
const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req, res) => {
  res.send('MongoDB + Node.js Working!');
});

// Create a new user
app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;
  const user = new User({ name, email, age });
  await user.save();
  res.send('User added successfully!');
});

// Get all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Start server
app.listen(3000, () => {
  console.log('🚀 Server running on port 3000');
});
