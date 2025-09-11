
    const User = mongoose.model("User", userSchema);

    const mongoose = require("mongoose");

    const userSchema = new mongoose.Schema({
    name: { type: String, required: true },   // String type, required field
    email: { type: String, unique: true },    // Must be unique
    age: { type: Number, min: 18 },           // Minimum age is 18
    isActive: { type: Boolean, default: true }, // Default value true
    createdAt: { type: Date, default: Date.now }
    });
