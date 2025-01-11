const express = require("express");
const app  = express();
const path = require("path");

const port = 3005;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.listen(port, () => {
    console.log(`App was listen on port: ${port}`);
})

app.get("/", (req, res) => {
    // res.send("This is home page.");
    res.render("home.ejs");
})