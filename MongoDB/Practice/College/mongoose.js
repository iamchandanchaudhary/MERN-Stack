// ==> Connecting to MongoDB
const mongoose = require('mongoose');

// connect to local MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const { Schema, model } = mongoose;

// ==> Defining a Schema & Model
// Define schema
const userSchema = new Schema({
    name: { type: String, required: true },   // validation
    age: { type: Number, min: 18 },           // custom rule
    email: { type: String, unique: true },    // must be unique
    createdAt: { type: Date, default: Date.now }
});

// Create model
const User = model("User", userSchema);

// ==> CRUD Operation

// Create
const newUser = new User({ name: "Chandan", age: 22, email: "Chandan@mail.com" });
await newUser.save();

// Read
const users = await User.find();            // get all
const user = await User.findOne({ name: "Chandan" });

// Update
await User.updateOne({ name: "Chandan" }, { age: 23 });

// Delete
await User.deleteOne({ name: "Chandan" });
