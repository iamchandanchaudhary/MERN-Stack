const express = require("express");
const app = express();

const port = 3009;

app.listen(port, () => {
    console.log(`App was listen on Port: ${port}`);
})

app.get("/", (req, res) => {
    res.send("Home page.");
});

app.set("view engine", "ejs");

app.get("/rolldice", (req, res) => {
    let value = Math.floor(Math.random() * 6) + 1;

    res.render("conditional.ejs", { value });
})