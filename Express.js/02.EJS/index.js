const express = require("express");

const app  = express();

const port = 3005;

app.listen(port, () => {
    console.log(`App was listen on port: ${port}`);
})

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    // res.send("This is home page.");
    res.render("home.ejs");
})