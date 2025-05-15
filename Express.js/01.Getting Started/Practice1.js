const express = require("express");

const app = express();

let port = 8080;

app.listen(port, () => {
    console.log(`app was listning on port: ${port}`);
});

app.get("/", (req, res) => {
    res.send("Home Page.");
});

app.get("/help", (req, res) => {
    res.send("Help Page.");
});

app.get("/account", (req, res) => {
    res.send("You Account.");
});

app.get("*", (req, res) => {
    res.send("Page not found");
});

app.post("/", (req, res) => {
    res.send("This is a Post request.");
});