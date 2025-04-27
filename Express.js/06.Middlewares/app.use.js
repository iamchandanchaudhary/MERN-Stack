const express = require("express");

const app = express();

// Using middlewares
app.use((req, res, next) => {
    console.log("Hii, I'm a middleware.");
    next();
});

// Using specific path middleware
app.use("/random", (req, res, next) => {
    console.log("i'm only for random");
    next();
})

// Using error messege 404
app.use((req, res) => {
    res.status(404).send("Page not found, Error 404");
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