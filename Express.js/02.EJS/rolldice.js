const express = require("express");
const app = express();

const port = 3007;

app.listen(port, () => {
    console.log(`App was listning on port: ${port}`);
})

app.get("/", (req, res) => {
    res.send("Home Page");
})

app.set("view engine", "ejs");

app.get("/rolldice", (req, res) => {
    let diceValue = Math.floor(Math.random() * 6) + 1;
    res.render("rolldice.ejs", { diceValue });
})