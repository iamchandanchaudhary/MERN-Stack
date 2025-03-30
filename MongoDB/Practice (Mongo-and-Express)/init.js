const mongoose = require("mongoose");
const Student = require("./models/student");

main()
    .then(() => console.log("Connection Successful..."))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/college11");
}

const allStudent = [
    {name: "Chandan Chaudhary", age: 18, city: "Basti"},
    {name: "Sanjit Sharma", age: 31, city: "Raipur"},
    {name: "Ekansh Shukla", age: 28, city: "Kanpur"},
    {name: "Bijay Mehta", age: 24, city: "Bhopal"},
    {name: "Vijay Partap", age: 26, city: "Kolkata"},
];

Student.insertMany(allStudent)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

// Student.find({}).then((data) => console.log(data)).catch((err) => console.log(err));
// Student.deleteMany({age: {$gt: 15}}).then((data) => console.log(data)).catch((err) => console.log(err));