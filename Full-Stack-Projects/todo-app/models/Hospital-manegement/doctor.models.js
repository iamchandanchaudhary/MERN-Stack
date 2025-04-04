const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const Doctor = mongoose.model("Doctor", doctorSchema);