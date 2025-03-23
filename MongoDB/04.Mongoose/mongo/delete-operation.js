const mongoose = require("mongoose");

main()
    .then(() => console.log("Connection Successful."))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/college4");
}

const employeeData = new mongoose.Schema({
    name: String,
    age: Number,
    city: String,
    sallary: Number
});

const Employee = mongoose.model("Employee", employeeData);

// Employee.insertMany([
//     {name: "ChanduBhaiii", age: 18, city: "Basti", sallary: 210000},
//     {name: "Anand Kumar", age: 21, city: "Gandhi Nagar", sallary: 52100},
//     {name: "Nidhi Pandey", age: 28, city: "Vanarash", sallary: 72100},
//     {name: "Ajad Pathak", age: 23, city: "Kolkata", sallary: 37100},
//     {name: "Akash Rajbhar", age: 26, city: "Vanarash", sallary: 62100},
//     {name: "Alok Maurya", age: 20, city: "Kolkata", sallary: 67100}
// ])
//     .then((data) => console.log(data));

Employee.find({}).then((data) => console.log(data));

// ==> deleteOne
Employee.deleteOne({age: 23}).then((res) => console.log(res));

Employee.find({}).then((data) => console.log(data));

// // ==> deleteMany
Employee.deleteMany({age: {$gte: 22}}).then((res) => console.log(res));

// ==> find & Delete
Employee.findOneAndDelete({name: "Alok Maurya"}).then((data) => console.log(data));  // delete but also shows the deleted value
Employee.findByIdAndDelete('67d1865ff1523d72d5bdcc4a').then((data) => console.log(data));  // delete but also shows the deleted value

Employee.find({}).then((data) => console.log(data));

// ==> delete all data from db
Person.deleteMany({}).then((data) => console.log(data)); 