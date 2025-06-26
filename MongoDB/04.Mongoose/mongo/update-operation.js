const mongoose = require("mongoose");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/college4");
}

main()
    .then(() => console.log("Connection Successeful"))
    .catch((err) => console.log(err));

const personData = new mongoose.Schema({
    name: String,
    city: String,
    age: Number
});

const Person = mongoose.model("Person", personData);

// Person.insertMany([
//     {name: "Chandan Chaudhary", city: "Basti", age: 18},
//     {name: "Nikhil Pandey", city: "Lucknow", age: 27},
//     {name: "Abhisekh Sharma", city: "Haidrabad", age: 22},
//     {name: "Sonam Singh", city: "Mumbai", age: 20}
// ])
//     .then((data) => console.log(data));

// Person.find({}).then((data) => console.log(data));

// ==> UpdateOne
Person.updateOne({name: "Nikhil Pandey"}, {name: "Nikhil Yadav"}).then((res) => console.log(res));
Person.updateOne({name: "Abhisekh Sharma"}, {age: 24}).then((res) => console.log(res));


// // ==> UpdateMany
Person.updateMany({age: {$gte: 20}}, {age: 25}).then((res) => console.log(res));

Person.find({}).then((data) => console.log(data));

// ==> findAndUpdate
Person.findOneAndUpdate({name: "Sonam Singh"}, {city: "Delhi"}).then((res) => console.log(res)); // first find and then Update

Person.findOneAndUpdate({name: "Sonam Singh"}, {age: 29}, {new: true}).then((res) => console.log(res));  // return the modified document rather then the original

Person.find({}).then((data) => console.log(data));

// ==> findByIdAndUpdate
Person.findByIdAndUpdate("67d01d517cdadbd24c36ef9b", {age: 31}, {new: true}).then((res) => console.log(res));