const mongoose = require("mongoose");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/college5');
}

main()
    .then(() => console.log("Connection Successeful."))
    .catch((err) => console.log(err));

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    marks: Number,
})

const Student = mongoose.model("Student", studentSchema);

// ==> insert many data
// Student.insertMany([
//     {name: "Chandan", age: 18, marks: 91},
//     {name: "Safali", age: 25, marks: 82},
//     {name: "Anshika", age: 19, marks: 78},
//     {name: "Anchal", age: 17, marks: 95},
//     {name: "Aman", age: 16, marks: 87}
// ])
//     .then((data) => console.log(data));

Student.find({}).then((data) => console.log(data));

// task 2 ==> find operation
// Student.find({marks: {$gte: 80}}).then((data) => console.log(data));

// taks 3 ==> UpdateMany
// Student.updateMany({name: "Chandan"}, {marks: 95}).then((res) => console.log(res));

// // task 4 ==> delete operation
// Student.deleteMany({age: {$lt: 18}}).then((res) => console.log(res));

// // task 5 ==> find operation
Student.find({ $and: [{marks: {$gt: 70}}, {age: {$lt: 22}}] }).then((data) => console.log(data));


// Student.deleteMany({age: {$gt: 11}}).then((res) => console.log(res));