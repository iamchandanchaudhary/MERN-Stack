const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);