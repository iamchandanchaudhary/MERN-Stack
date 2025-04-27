const express = require("express");

const app = express();

// Using middlewares
app.use((req, res, next) => {
    console.log("Hii, I'm a middleware.");

    req.time = new Date(Date.now()).toString();
    console.log(req.method, req.path, req.hostname, req.time);
    
    next();
});

app.listen(8080, () => {
    console.log("App was listning on port: 8080");
});

app.get("/", (req, res) => {
    res.send("This is a root route");
})

app.get("/random", (req, res) => {
    res.send("This is a random route");
})