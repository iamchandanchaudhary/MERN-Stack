const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Item = require("./models/Item");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/SimpleAppDB")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Home Page - Show all items
app.get("/", async (req, res) => {
    const items = await Item.find();
    res.render("index", { items });
});

// Add a new item
app.post("/add", async (req, res) => {
    const newItem = new Item({ name: req.body.itemName });
    await newItem.save();
    res.redirect("/");
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
