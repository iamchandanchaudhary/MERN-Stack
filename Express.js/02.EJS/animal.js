const express = require("express");
const app = express();

const port = 3011;

app.listen(port, () => {
    console.log(`App was listen on Port: ${ port }`);
})

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>");
})

app.get("/ig/monkey", (req, res) => {
    let { username } = req.params;
    res.render("monkey.ejs");
})

app.get("/ig/donkey", (req, res) => {
    let { username } = req.params;
    res.render("donkey.ejs");
})

app.get("/ig/*", (req, res) => {
    res.render("error.ejs");
})