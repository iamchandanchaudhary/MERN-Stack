const express = require("express");
const app = express();
let path = require("path");

const port = 3015;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.set(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
    console.log(`App was listen on Port: ${port}.`);
})

app.get("/", (req, res) => {
    res.send("Home Page.");
})