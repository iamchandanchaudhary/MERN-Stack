import { Router } from "express";
import {
	changeUserPassword,
	getUserProfile,
	loginUser,
	registerUser,
	updateUserProfile
} from "../controllers/userController.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:userId", getUserProfile);
router.put("/:userId", updateUserProfile);
router.put("/:userId/password", changeUserPassword);

export default router;
