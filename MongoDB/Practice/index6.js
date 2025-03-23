const mongoose = require("mongoose");

main()
    .then(() => console.log("Connection Successful..."))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Practice6");
}

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    age: {
        type: Number
    },

    city: {
        type: String
    }
})

const Person = new mongoose.model("Person", personSchema);

// Person.insertMany([
//     {name: "Chandan", age: 18, city: "Basti"},
//     {name: "Avinash", age: 21, city: "Lucknow"},
//     {name: "Akashay", age: 22, city: "Siddarthnagar"},
// ])

// Person.find({}).then((data) => console.log(data));
Person.deleteMany({}).then((data) => console.log(data));