const express = require("express");
const mongoose = require("mongoose");

const Student = require("./models/student");

const app = express();

app.listen(8080, () => {
    console.log("App was listning on port 8080");
})

app.get("/", (req, res) => {
    res.send("working");
})

main()
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.log(err));

async function main() {
    mongoose.connect("mongodb://127.0.0.1:27017/college11");
}

// Student.insertMany([
//     {name: "Chandan Chaudhary", age: 18, city: "Basti"},
//     {name: "Sanjit Sharma", age: 31, city: "Raipur"},
//     {name: "Ekansh", age: 28, city: "Kanpur"},
// ])
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));

Student.find({}).then((data) => console.log(data)).catch((err) => console.log(err));
// Student.deleteMany({age: {$gt: 15}}).then((data) => console.log(data)).catch((err) => console.log(err));