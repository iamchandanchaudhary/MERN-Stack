const express = require("express");
const app = express();
// const path = require("path");

const port = 3006;

app.listen(port, () => {
    console.log(`App was listning on port: ${port}`);
})
    
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    // res.send("Home");
    res.render("Interpolation-Syntax.ejs");
})