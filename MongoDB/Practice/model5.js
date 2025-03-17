const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    age: {
        type: Number,
        min: [1, "Please enter valid age."],
    },

    course: {
        type: String,
    },

    city: {
        type: String,
    }
});

const Person = new mongoose.model("Person", personSchema);

module.exports = Person;