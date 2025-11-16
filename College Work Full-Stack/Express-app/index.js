const express = require("express");
const app = express();

// Route to display message
app.get("/", (req, res) => {
    res.send("Hello ExpressJS");
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});