const express = require("express");

const app = express();

// console.dir(app);

let port = 8080; // 8080

app.listen(port, () => {
    console.log(`app was listning on port: ${port}`);
});

app.get("/", (req, res) => {
    res.send("You Contacted root Directory.")
});

app.get("/help", (req, res) => {
    res.send("You Contacted help Directory.")
});

app.get("/account", (req, res) => {
    res.send("You Contacted account Directory.")
});