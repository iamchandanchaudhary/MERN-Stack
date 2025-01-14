const express = require("express");
const app = express();

const port = 3012;

app.listen(port, () => {
    console.log(`App was listen on Port: ${port}`);
})

app.get("/", (req, res) => {
    res.send("Home Page");
})

app.get("/register", (req, res) => {
    let { username, passward } = req.query;
    res.send(`<h3> This is a GET response. <br>Hello & Welcome ${ username }!</h3>`);
})

app.post("/register", (req, res) => {
    // let { username, passward } = req.params;
    res.send("<h1> This is a POST response. </h1>");
})