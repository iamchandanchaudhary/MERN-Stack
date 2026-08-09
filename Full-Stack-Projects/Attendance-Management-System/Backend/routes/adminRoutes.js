import express from "express";
import {
	createManagedUser,
	deleteManagedUser,
	getManagedUsers,
	updateManagedUser,
} from "../controllers/adminController.js";
import { requireAuth, requireRole } from "../middlewares/authMiddleware.js";

const adminRouter = express.Router();

adminRouter.use(requireAuth);
adminRouter.use(requireRole("admin"));

adminRouter.post("/users", createManagedUser);
adminRouter.get("/users", getManagedUsers);
adminRouter.patch("/users/:userId", updateManagedUser);
adminRouter.delete("/users/:userId", deleteManagedUser);

export default adminRouter;
