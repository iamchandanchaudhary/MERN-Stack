import express from "express";
import { deleteUser, getAllUsers, getUserDetails, loginAdmin } from "../controllers/adminController.js";
import { requireRole, verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/users", verifyToken, requireRole("admin"), getAllUsers);
router.get("/users/:id", verifyToken, requireRole("admin"), getUserDetails);
router.delete("/users/:id", verifyToken, requireRole("admin"), deleteUser);

export default router;
