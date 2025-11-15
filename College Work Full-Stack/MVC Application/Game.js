const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    name: String,
    rating: Number
});

module.exports = mongoose.model("Game", gameSchema);