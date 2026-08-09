import express from "express";
import {
	createTask,
	deleteTask,
	getMyTasks,
	getTaskById,
	toggleTaskStatus,
	updateTask
} from "../controllers/taskController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", verifyToken, getMyTasks);
router.get("/:id", verifyToken, getTaskById);
router.post("/", verifyToken, createTask);
router.put("/:id", verifyToken, updateTask);
router.patch("/:id/status", verifyToken, toggleTaskStatus);
router.delete("/:id", verifyToken, deleteTask);

export default router;
