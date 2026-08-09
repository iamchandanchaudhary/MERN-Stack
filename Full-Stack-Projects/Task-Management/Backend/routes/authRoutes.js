import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", verifyToken, (req, res) => {
  return res.json({
    message: "Token is valid.",
    user: req.user
  });
});

export default router;
