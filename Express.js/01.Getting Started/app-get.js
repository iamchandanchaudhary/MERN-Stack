const express = require("express");

const app = express();

// console.dir(app);

let port = 8080; // 8080

app.listen(port, () => {
    console.log(`app was listning on port: ${port}`);
});

// Routing is use to send a specific request based on specific path
app.get("/", (req, res) => {
    res.send("You Contacted root path.");
});

app.get("/help", (req, res) => {
    res.send("You Contacted help path.");
});

app.get("/account", (req, res) => {
    res.send("You Contacted account path.");
});

// What if path is wrong
app.get("*", (req, res) => {
    res.send("This path doesn't exist.");
});

app.post("/", (req, res) => {
    res.send("You send a Post request.");
});