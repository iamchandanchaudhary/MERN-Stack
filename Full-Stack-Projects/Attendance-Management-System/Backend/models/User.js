import mongoose from "mongoose";

export const DEPARTMENT_OPTIONS = [
    "computer_science",
    "mathematics",
    "physics",
    "commerce",
    "humanities",
];

export const SUBJECT_OPTIONS = [
    "data_structures",
    "algorithms",
    "database_systems",
    "operating_systems",
    "machine_learning",
    "calculus",
    "statistics",
    "physics_lab",
    "chemistry_lab",
    "english_communication",
];

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        identifier: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "teacher", "student"],
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        departments: {
            type: [String],
            enum: DEPARTMENT_OPTIONS,
            default: [],
        },
        subjects: {
            type: [String],
            enum: SUBJECT_OPTIONS,
            default: [],
        },
    },
    {
        timestamps: true,
    },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
