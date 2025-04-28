const express = require("express");

const app = express();

// Using middlewares
app.use((req, res, next) => {
    console.log("Hii, I'm a middleware.");
    next();
});

// Passing middlewares in variable function
const checkTocken = ("/api", (req, res, next) => {
    let { token } = req.query;

    if(token === "giveaccess") {
        next();
    }

    res.send("ACCESS DENIED!!!");
})

// using middleware as a authentication check
app.get("/api", checkTocken, (req, res) => {
    res.send("ACCESS, This is a Secure Data");
})

app.listen(8080, () => {
    console.log("App was listning on port: 8080");
});

app.get("/", (req, res) => {
    res.send("This is a root route");
})

app.get("/random", (req, res) => {
    res.send("This is a random route");
})