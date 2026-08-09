import express from "express";
import {
    getStudentsForAttendance,
    getTeacherAttendanceMeta,
    getTeacherDashboardSummary,
    submitTeacherAttendance,
} from "../controllers/teacherController.js";
import { requireAuth, requireRole } from "../middlewares/authMiddleware.js";

const teacherRouter = express.Router();

teacherRouter.use(requireAuth);
teacherRouter.use(requireRole("teacher"));

teacherRouter.get("/dashboard-summary", getTeacherDashboardSummary);
teacherRouter.get("/attendance/meta", getTeacherAttendanceMeta);
teacherRouter.get("/attendance/students", getStudentsForAttendance);
teacherRouter.post("/attendance", submitTeacherAttendance);

export default teacherRouter;
