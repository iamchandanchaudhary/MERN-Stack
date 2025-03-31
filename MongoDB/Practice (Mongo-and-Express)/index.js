const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const Student = require("./models/student");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
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

// index route
app.get("/students", async(req, res) => {
    let students = await Student.find();

    res.render("college.ejs", { students });
});

// new route
app.get("/students/new", (req, res) => {
    res.render("newData.ejs");
})

// create new data
app.post("/students", (req, res) => {
    let { name, age, city } = req.body;

    let newStudent = new Student({
        name: name,
        age: age,
        city: city,
    });

    newStudent.save().then(() => console.log("Data was saved")).catch((err) => console.log(err));
    res.redirect("/students");
})