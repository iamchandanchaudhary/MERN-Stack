import Task from "../models/Task.js";

const getUserId = (req) => req.user?.id || req.user?._id;

const findOwnedTask = async (taskId, userId) => Task.findOne({ _id: taskId, userId });

export const getTaskById = async (req, res) => {
  try {
    const userId = getUserId(req);
    const task = await findOwnedTask(req.params.id, userId);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    return res.json({ task });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to load task."
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { taskName, description, taskDate, taskTime } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    if (!taskName || !description || !taskDate || !taskTime) {
      return res.status(400).json({
        message: "Task name, description, date, and time are required."
      });
    }

    const task = await Task.create({
      userId,
      taskName: taskName.trim(),
      description: description.trim(),
      taskDate,
      taskTime
    });

    return res.status(201).json({
      message: "Task created successfully.",
      task
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to create task."
    });
  }
};

export const getMyTasks = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });

    return res.json({
      tasks
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch tasks."
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const userId = getUserId(req);
    const task = await findOwnedTask(req.params.id, userId);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    const { taskName, description, taskDate, taskTime } = req.body;

    if (!taskName || !description || !taskDate || !taskTime) {
      return res.status(400).json({
        message: "Task name, description, date, and time are required."
      });
    }

    task.taskName = taskName.trim();
    task.description = description.trim();
    task.taskDate = taskDate;
    task.taskTime = taskTime;

    await task.save();

    return res.json({
      message: "Task updated successfully.",
      task
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to update task."
    });
  }
};

export const toggleTaskStatus = async (req, res) => {
  try {
    const userId = getUserId(req);
    const task = await findOwnedTask(req.params.id, userId);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    task.status = task.status === "completed" ? "pending" : "completed";
    await task.save();

    return res.json({
      message: task.status === "completed" ? "Task marked as completed." : "Task moved back to pending.",
      task
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to update task status."
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const userId = getUserId(req);
    const task = await findOwnedTask(req.params.id, userId);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    await task.deleteOne();

    return res.json({
      message: "Task deleted successfully."
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to delete task."
    });
  }
};
