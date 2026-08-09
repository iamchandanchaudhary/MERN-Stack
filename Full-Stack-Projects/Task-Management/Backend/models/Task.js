import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    taskName: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    taskDate: {
      type: String,
      required: true
    },
    taskTime: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
