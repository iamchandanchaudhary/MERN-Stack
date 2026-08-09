import express from "express";
import { getStudentAttendance } from "../controllers/studentController.js";
import { requireAuth, requireRole } from "../middlewares/authMiddleware.js";

const studentRouter = express.Router();

studentRouter.use(requireAuth);
studentRouter.use(requireRole("student"));

studentRouter.get("/attendance", getStudentAttendance);

export default studentRouter;
