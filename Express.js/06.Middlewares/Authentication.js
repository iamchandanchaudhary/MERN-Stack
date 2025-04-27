const express = require("express");

const app = express();

// Using middlewares
app.use((req, res, next) => {
    console.log("Hii, I'm a middleware.");
    next();
});

app.use("/api", (req, res, next) => {
    let { token } = req.query;

    if(token === "giveaccess") {
        next();
    }

    res.send("ACCESS DENIED!!!")
})

app.get("/api", (req, res) => {
    res.send("ACCESS, This is a Secure Data");
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