import jwt from "jsonwebtoken";
import Task from "../models/Task.js";
import User from "../models/User.js";

const normalizeEmail = (email) => email.trim().toLowerCase();

const getJwtSecret = () => process.env.JWT_SECRET;

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL
      ? normalizeEmail(process.env.ADMIN_EMAIL)
      : "";
    const adminPassword = process.env.ADMIN_PASSWORD || "";

    if (!adminEmail || !adminPassword) {
      return res.status(500).json({
        message: "Admin credentials are not configured."
      });
    }

    const emailMatch = normalizeEmail(email) === adminEmail;
    const passwordMatch = password === adminPassword;

    if (!emailMatch || !passwordMatch) {
      return res.status(401).json({
        message: "Invalid admin credentials."
      });
    }

    return res.json({
      message: "Admin login successful.",
      token: jwt.sign(
        {
          email: adminEmail,
          role: "admin"
        },
        getJwtSecret(),
        { expiresIn: "7d" }
      ),
      user: {
        email: adminEmail,
        role: "admin"
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to login."
    });
  }
};

const buildTaskStats = async (userIds) => {
  if (!userIds.length) {
    return new Map();
  }

  const stats = await Task.aggregate([
    { $match: { userId: { $in: userIds } } },
    {
      $group: {
        _id: "$userId",
        total: { $sum: 1 },
        pending: {
          $sum: {
            $cond: [{ $eq: ["$status", "pending"] }, 1, 0]
          }
        },
        completed: {
          $sum: {
            $cond: [{ $eq: ["$status", "completed"] }, 1, 0]
          }
        },
        inProgress: {
          $sum: {
            $cond: [{ $eq: ["$status", "in-progress"] }, 1, 0]
          }
        }
      }
    }
  ]);

  return new Map(
    stats.map((item) => [item._id.toString(), {
      total: item.total || 0,
      pending: item.pending || 0,
      completed: item.completed || 0,
      inProgress: item.inProgress || 0
    }])
  );
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password").sort({ createdAt: -1 });
    const userIds = users.map((user) => user._id);
    const statsMap = await buildTaskStats(userIds);

    const enrichedUsers = users.map((user) => ({
      ...user.toObject(),
      role: "user",
      taskStats: statsMap.get(user._id.toString()) || {
        total: 0,
        pending: 0,
        completed: 0,
        inProgress: 0
      }
    }));

    return res.json({
      users: enrichedUsers
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to load users."
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    const statsMap = await buildTaskStats([user._id]);

    return res.json({
      user: {
        ...user.toObject(),
        role: "user",
        taskStats: statsMap.get(user._id.toString()) || {
          total: 0,
          pending: 0,
          completed: 0,
          inProgress: 0
        }
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to load user details."
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    await Task.deleteMany({ userId: user._id });
    await user.deleteOne();

    return res.json({
      message: "User deleted successfully."
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to delete user."
    });
  }
};
