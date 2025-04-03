const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

}, {timestamps: true});

const Category = mongoose.model("Category", categorySchema);