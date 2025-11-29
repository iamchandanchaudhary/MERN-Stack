const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const PORT = 8080;

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

// PUT - Update a user
app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(484).json({ message: 'User not found' });
    user.name = req.body.name;
    user.email = req.body.email;
    res.json(user);
});

// DELETE - Delete a user
app.delete('/api/users/:id', (req, res) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.json({ message: 'User deleted successfully' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
});
