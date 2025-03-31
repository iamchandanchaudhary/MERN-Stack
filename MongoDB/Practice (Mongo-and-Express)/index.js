const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const Student = require("./models/student");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
    console.log("App was listen on port: 8080");
});

app.get("/", (req, res) => {
    res.send("working");
})

main()
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.log(err));

async function main() {
    mongoose.connect("mongodb://127.0.0.1:27017/college11");
}

// creating route
app.get("/students", async(req, res) => {
    let students = await Student.find();

    res.render("college.ejs", { students });
})