const mongoose = require("mongoose");

// mongoose.connect('mongodb://127.0.0.1:27017/college2');

main()
    .then(() => console.log("Connection Successeful."))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/college2');
}

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    course: String,
})

const Student = mongoose.model("Student", studentSchema);

// => insert many data
Student.insertMany([
    {name: "Sneha", age: 17, course: "MBBS"},
    {name: "Safali", age: 21, course: "MBA"},
    {name: "Anshika", age: 18, course: "BSCs Ag"},
    {name: "Anchal", age: 19, course: "BSCs Nursing"}
])
    .then((data) => console.log(data));