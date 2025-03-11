const mongoose = require("mongoose");

// mongoose.connect('mongodb://127.0.0.1:27017/college3');

main()
    .then(() => console.log("Connection Successeful."))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/college3');
}

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    course: String,
})

const Student = mongoose.model("Student", studentSchema);

// Student.insertMany([
//     {name: "Sneha", age: 17, course: "MBBS"},
//     {name: "Safali", age: 21, course: "MBA"},
//     {name: "Anshika", age: 18, course: "BSCs Ag"},
//     {name: "Anchal", age: 19, course: "BSCs Nursing"}
// ])
//     .then((data) => console.log(data));

// ==> find all
// Student.find({}).then((data) => console.log(data));


// find using conditions
// Student.find({age: {$gt: 20}}).then((data) => console.log(data));

// Student.find({}).then((data) => console.log(data[0])); // getting single data at first index
// Student.find({age: {$lt: 19}}).then((data) => console.log(data[0])); // getting single data at first index

// Student.find({age: {$lt: 19}}).then((data) => console.log("Student Name:", data[0].name)); // 

// ==> find one
// Student.findOne({}).then((data) => console.log(data));
// Student.findOne({age: {$gte: 18}}).then((data) => console.log(data)); // with operation

// ==> findById
Student.find({ _id: '67ced5ff518b11cb97af0b6c' }).then((data) => console.log(data));
Student.findById('67ced5ff518b11cb97af0b6d').then((data) => console.log(data));