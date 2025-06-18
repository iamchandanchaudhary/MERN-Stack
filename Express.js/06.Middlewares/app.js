// import express from "express";
const express = require("express");

const app = express();

// Using middlewares
app.use((req, res, next) => {
    console.log("Hii, I'm a middleware.");

    // res.send("Middleware finished");
    next();
});

app.use((req, res, next) => {
    console.log("Hii, I'm a 2nd middleware.");
    return next(); // after adding return, no any line of code execute after next() [example bellow 👇 dosen't execute]
    console.log("abc");
});

// another way of implementing middleware
const validation = (req, res, next) => {
    console.log("Hello, I'm validation middleware.");
    next();
}
app.use(validation);

app.listen(8080, () => {
    console.log("App was listning on port: 8080");
});

app.get("/", (req, res) => {
    res.send("This is a root route");
})

app.get("/random", (req, res) => {
    res.send("This is a random route");
})