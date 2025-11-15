const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const gameRoutes = require("./routes/gameRoutes");

const app = express();

// Set EJS as view engine
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/MVCDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/", gameRoutes);

// Start Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});