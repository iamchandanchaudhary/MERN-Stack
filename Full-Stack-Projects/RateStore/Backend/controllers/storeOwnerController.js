import bcrypt from "bcryptjs";
import {
    createStoreOwner,
    findStoreOwnerByEmail,
    findStoreOwnerById,
    updateStoreOwnerPasswordById,
    updateStoreOwnerProfileById
} from "../models/storeOwnerModel.js";

const buildStoreOwnerPayload = (owner) => ({
    id: owner.id,
    name: owner.name,
    email: owner.email,
    address: owner.address,
    role: owner.role || "store-owner"
});

export const registerStoreOwner = async (req, res) => {
    try {
        const { name, email, password, address } = req.body || {};

        if (!name || !email || !password || !address) {
            return res.status(400).json({
                message: "Name, email, password, and address are required."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existing = await findStoreOwnerByEmail(normalizedEmail);

        if (existing) {
            return res.status(409).json({
                message: "Account already exists. Please sign in."
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);
        const ownerId = await createStoreOwner({
            name: name.trim(),
            email: normalizedEmail,
            address: address.trim(),
            passwordHash
        });

        return res.status(201).json({
            user: buildStoreOwnerPayload({
                id: ownerId,
                name: name.trim(),
                email: normalizedEmail,
                address: address.trim(),
                role: "store-owner"
            })
        });
    } catch (error) {
        console.error("Store owner registration failed:", error);
        return res.status(500).json({
            message: "Unable to create account right now."
        });
    }
};

export const loginStoreOwner = async (req, res) => {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const owner = await findStoreOwnerByEmail(normalizedEmail);

        if (!owner) {
            return res.status(404).json({
                message: "Account not found. Please create an account."
            });
        }

        const passwordMatches = await bcrypt.compare(password, owner.password_hash);

        if (!passwordMatches) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        return res.status(200).json({
            user: buildStoreOwnerPayload(owner)
        });
    } catch (error) {
        console.error("Store owner login failed:", error);
        return res.status(500).json({
            message: "Unable to sign in right now."
        });
    }
};

export const getStoreOwnerProfile = async (req, res) => {
    try {
        const ownerId = Number.parseInt(req.params?.ownerId, 10);

        if (!ownerId) {
            return res.status(400).json({
                message: "Store owner id is required."
            });
        }

        const owner = await findStoreOwnerById(ownerId);

        if (!owner) {
            return res.status(404).json({
                message: "Store owner not found."
            });
        }

        return res.status(200).json({
            user: buildStoreOwnerPayload(owner)
        });
    } catch (error) {
        console.error("Store owner profile fetch failed:", error);
        return res.status(500).json({
            message: "Unable to load profile right now."
        });
    }
};

export const updateStoreOwnerProfile = async (req, res) => {
    try {
        const ownerId = Number.parseInt(req.params?.ownerId, 10);
        const name = req.body?.name?.trim();
        const address = req.body?.address?.trim();

        if (!ownerId || !name || !address) {
            return res.status(400).json({
                message: "Store owner id, name, and address are required."
            });
        }

        const existing = await findStoreOwnerById(ownerId);

        if (!existing) {
            return res.status(404).json({
                message: "Store owner not found."
            });
        }

        await updateStoreOwnerProfileById({
            ownerId,
            name,
            address
        });

        const updated = await findStoreOwnerById(ownerId);

        return res.status(200).json({
            user: updated ? buildStoreOwnerPayload(updated) : null
        });
    } catch (error) {
        console.error("Store owner profile update failed:", error);
        return res.status(500).json({
            message: "Unable to update profile right now."
        });
    }
};

export const changeStoreOwnerPassword = async (req, res) => {
    try {
        const ownerId = Number.parseInt(req.params?.ownerId, 10);
        const currentPassword = req.body?.currentPassword;
        const newPassword = req.body?.newPassword;

        if (!ownerId || !currentPassword || !newPassword) {
            return res.status(400).json({
                message: "Store owner id, current password, and new password are required."
            });
        }

        const owner = await findStoreOwnerById(ownerId);

        if (!owner) {
            return res.status(404).json({
                message: "Store owner not found."
            });
        }

        const passwordMatches = await bcrypt.compare(currentPassword, owner.password_hash);

        if (!passwordMatches) {
            return res.status(401).json({
                message: "Current password is incorrect."
            });
        }

        const passwordHash = await bcrypt.hash(newPassword, 12);
        await updateStoreOwnerPasswordById({ ownerId, passwordHash });

        return res.status(200).json({
            message: "Password updated."
        });
    } catch (error) {
        console.error("Store owner password update failed:", error);
        return res.status(500).json({
            message: "Unable to update password right now."
        });
    }
};
