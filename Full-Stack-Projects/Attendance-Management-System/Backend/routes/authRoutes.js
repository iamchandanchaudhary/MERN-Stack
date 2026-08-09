import express from "express";
import { getCurrentUser, login, logout } from "../controllers/authController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/logout", requireAuth, logout);
authRouter.get("/me", requireAuth, getCurrentUser);

export default authRouter;
