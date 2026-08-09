import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET?.trim() || "dev-attendance-secret";

export const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization || "";

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Authorization token is required.",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded.userId) {
            return res.status(401).json({
                success: false,
                message: "Invalid token payload.",
            });
        }

        const user = await User.findById(decoded.userId).select(
            "_id role identifier name",
        );

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found for this token.",
            });
        }

        req.user = {
            id: user._id.toString(),
            role: user.role,
            identifier: user.identifier,
            name: user.name,
        };

        return next();
    } catch (_error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};

export const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to perform this action.",
            });
        }

        return next();
    };
};
