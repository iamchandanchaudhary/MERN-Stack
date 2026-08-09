import mongoose from "mongoose";
import { DEPARTMENT_OPTIONS, SUBJECT_OPTIONS } from "./User.js";

const attendanceRecordSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["present", "absent"],
            required: true,
            default: "present",
        },
    },
    {
        _id: false,
    },
);

const attendanceSchema = new mongoose.Schema(
    {
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        department: {
            type: String,
            enum: DEPARTMENT_OPTIONS,
            required: true,
            index: true,
        },
        subject: {
            type: String,
            enum: SUBJECT_OPTIONS,
            required: true,
            index: true,
        },
        dateKey: {
            type: String,
            required: true,
            index: true,
        },
        records: {
            type: [attendanceRecordSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    },
);

attendanceSchema.index(
    { teacher: 1, department: 1, subject: 1, dateKey: 1 },
    { unique: true },
);

const Attendance =
    mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);

export default Attendance;
