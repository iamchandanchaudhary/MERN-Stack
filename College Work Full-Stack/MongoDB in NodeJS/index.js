const express = require("express");
const connectDB = require("./db");

const app = express();

// Connect Database
connectDB();

app.get("/", (req, res) => {
  res.send("MongoDB Connected ✅");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
