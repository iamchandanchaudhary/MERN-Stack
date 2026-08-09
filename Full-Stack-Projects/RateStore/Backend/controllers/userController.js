import bcrypt from "bcryptjs";
import {
    createUser,
    findUserByEmail,
    findUserById,
    updateUserPasswordById,
    updateUserProfileById
} from "../models/userModel.js";

const buildUserPayload = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    address: user.address,
    role: user.role || "user"
});

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, address } = req.body || {};

        if (!name || !email || !password || !address) {
            return res.status(400).json({
                message: "Name, email, password, and address are required."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existing = await findUserByEmail(normalizedEmail);

        if (existing) {
            return res.status(409).json({
                message: "Account already exists. Please sign in."
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);
        const userId = await createUser({
            name: name.trim(),
            email: normalizedEmail,
            address: address.trim(),
            passwordHash
        });

        return res.status(201).json({
            user: buildUserPayload({
                id: userId,
                name: name.trim(),
                email: normalizedEmail,
                address: address.trim(),
                role: "user"
            })
        });
    } catch (error) {
        console.error("User registration failed:", error);
        return res.status(500).json({
            message: "Unable to create account right now."
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const user = await findUserByEmail(normalizedEmail);

        if (!user) {
            return res.status(404).json({
                message: "Account not found. Please create an account."
            });
        }

        const passwordMatches = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatches) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        return res.status(200).json({
            user: buildUserPayload(user)
        });
    } catch (error) {
        console.error("User login failed:", error);
        return res.status(500).json({
            message: "Unable to sign in right now."
        });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const userId = Number.parseInt(req.params?.userId, 10);

        if (!userId) {
            return res.status(400).json({
                message: "User id is required."
            });
        }

        const user = await findUserById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        return res.status(200).json({
            user: buildUserPayload(user)
        });
    } catch (error) {
        console.error("User profile fetch failed:", error);
        return res.status(500).json({
            message: "Unable to load profile right now."
        });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const userId = Number.parseInt(req.params?.userId, 10);
        const name = req.body?.name?.trim();
        const address = req.body?.address?.trim();

        if (!userId || !name || !address) {
            return res.status(400).json({
                message: "User id, name, and address are required."
            });
        }

        const existing = await findUserById(userId);

        if (!existing) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        await updateUserProfileById({
            userId,
            name,
            address
        });

        const updated = await findUserById(userId);

        return res.status(200).json({
            user: updated ? buildUserPayload(updated) : null
        });
    } catch (error) {
        console.error("User profile update failed:", error);
        return res.status(500).json({
            message: "Unable to update profile right now."
        });
    }
};

export const changeUserPassword = async (req, res) => {
    try {
        const userId = Number.parseInt(req.params?.userId, 10);
        const currentPassword = req.body?.currentPassword;
        const newPassword = req.body?.newPassword;

        if (!userId || !currentPassword || !newPassword) {
            return res.status(400).json({
                message: "User id, current password, and new password are required."
            });
        }

        const user = await findUserById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        const passwordMatches = await bcrypt.compare(currentPassword, user.password_hash);

        if (!passwordMatches) {
            return res.status(401).json({
                message: "Current password is incorrect."
            });
        }

        const passwordHash = await bcrypt.hash(newPassword, 12);
        await updateUserPasswordById({ userId, passwordHash });

        return res.status(200).json({
            message: "Password updated."
        });
    } catch (error) {
        console.error("User password update failed:", error);
        return res.status(500).json({
            message: "Unable to update password right now."
        });
    }
};
