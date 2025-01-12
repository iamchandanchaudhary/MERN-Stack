const express = require("express");
const app = express();

const port = 3008;

app.listen(port, () => {
    console.log(`App was listning on port: ${port}`);
})

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    let htmlCode = "<h1>Home Page</h1>";
    res.send(htmlCode);
})

app.get("/ig/:username", (req, res) => {
    let { username } = req.params;
    res.render("instagram.ejs", { username });
})