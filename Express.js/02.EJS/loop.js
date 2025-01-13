const express = require("express");
const app = express();

const port = 3010;

app.listen(port, () => {
    console.log(`App was listning on Port: ${port}`);
})

app.get("/", (req, res) => {
    res.send("Home Page.");
})

app.set("view engine", "ejs");

app.get("/ig/:username", (req, res) => {
    let { username } = req.params;
    let followers = ["Aman", "Aditya", "Sumit", "Vijay"];

    res.render("loop.ejs", { username, followers });
})