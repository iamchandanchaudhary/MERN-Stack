import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const TOKEN_EXPIRY = "8h";
const JWT_SECRET = process.env.JWT_SECRET?.trim() || "dev-attendance-secret";

const sanitizeUser = (user) => ({
    id: user._id,
    role: user.role,
    identifier: user.identifier,
    name: user.name,
});

const createAuthToken = (user) => {
    return jwt.sign(
        {
            userId: user._id,
            role: user.role,
            identifier: user.identifier,
            name: user.name,
        },
        JWT_SECRET,
        { expiresIn: TOKEN_EXPIRY },
    );
};

export const login = async (req, res) => {
    try {
        const { role, identifier, password } = req.body;

        if (!role || !identifier || !password) {
            return res.status(400).json({
                success: false,
                message: "Role, identifier, and password are required.",
            });
        }

        const normalizedRole = String(role).trim().toLowerCase();
        const normalizedIdentifier = String(identifier).trim().toLowerCase();

        const user = await User.findOne({
            role: normalizedRole,
            identifier: normalizedIdentifier,
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials.",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            String(password),
            user.passwordHash,
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials.",
            });
        }

        const token = createAuthToken(user);

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: sanitizeUser(user),
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to login right now.",
            error: error.message,
        });
    }
};

export const logout = (_req, res) => {
    return res.status(200).json({
        success: true,
        message: "Logout successful.",
    });
};

export const getCurrentUser = (req, res) => {
    return res.status(200).json({
        success: true,
        user: {
            id: req.user.id,
            role: req.user.role,
            identifier: req.user.identifier,
            name: req.user.name,
        },
    });
};
