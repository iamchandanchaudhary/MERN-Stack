const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    age: {
        type: Number,
        required: true,
    },

    city: {
        type: String,
        maxLength: 20,
    },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;