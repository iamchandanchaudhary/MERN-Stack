import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";
import { deleteUserById, findUserById, listUsers } from "../models/userModel.js";
import { deleteStoreOwnerById, findStoreOwnerById, listStoreOwners } from "../models/storeOwnerModel.js";
import { findStoreById, listStoresByOwner, deleteStoreById } from "../models/storeModel.js";
import { deleteStoreRatingsByStoreId, deleteStoreRatingsByUserId } from "../models/storeRatingModel.js";

const safeEqual = (value, expected) => {
    if (typeof value !== "string" || typeof expected !== "string") {
        return false;
    }

    const valueBuf = Buffer.from(value);
    const expectedBuf = Buffer.from(expected);

    if (valueBuf.length !== expectedBuf.length) {
        return false;
    }

    return crypto.timingSafeEqual(valueBuf, expectedBuf);
};

const normalizeId = (value) => (typeof value === "string" ? value.trim() : "");

const parseNumericId = (value) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? null : parsed;
};

export const loginAdmin = (req, res) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required."
        });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
        return res.status(500).json({
            message: "Admin credentials are not configured."
        });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedAdminEmail = adminEmail.trim().toLowerCase();

    const emailMatches = safeEqual(normalizedEmail, normalizedAdminEmail);
    const passwordMatches = safeEqual(password, adminPassword);

    if (!emailMatches || !passwordMatches) {
        return res.status(401).json({
            message: "Invalid admin credentials."
        });
    }

    return res.status(200).json({
        user: {
            id: "admin",
            name: "Admin",
            email: normalizedAdminEmail,
            role: "admin"
        }
    });
};

const buildAdminUserPayload = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    address: user.address,
    role: user.role || "user",
    createdAt: user.created_at
});

const buildAdminStoreOwnerPayload = (owner) => ({
    id: owner.id,
    name: owner.name,
    email: owner.email,
    address: owner.address,
    role: owner.role || "store-owner",
    createdAt: owner.created_at
});

export const listRegisteredUsers = async (req, res) => {
    try {
        const users = await listUsers();

        return res.status(200).json({
            users: users.map(buildAdminUserPayload)
        });
    } catch (error) {
        console.error("Admin user list failed:", error);
        return res.status(500).json({
            message: "Unable to load users right now."
        });
    }
};

export const listRegisteredStoreOwners = async (req, res) => {
    try {
        const owners = await listStoreOwners();

        return res.status(200).json({
            storeOwners: owners.map(buildAdminStoreOwnerPayload)
        });
    } catch (error) {
        console.error("Admin store owner list failed:", error);
        return res.status(500).json({
            message: "Unable to load registered stores right now."
        });
    }
};

export const deleteRegisteredUser = async (req, res) => {
    try {
        const userId = parseNumericId(req.params?.userId);

        if (!userId) {
            return res.status(400).json({
                message: "User id is required."
            });
        }

        const existing = await findUserById(userId);

        if (!existing) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        await deleteStoreRatingsByUserId(userId);
        await deleteUserById(userId);

        return res.status(200).json({
            message: "User deleted."
        });
    } catch (error) {
        console.error("Admin delete user failed:", error);
        return res.status(500).json({
            message: "Unable to delete user right now."
        });
    }
};

export const deleteRegisteredStoreOwner = async (req, res) => {
    try {
        const ownerId = parseNumericId(req.params?.ownerId);

        if (!ownerId) {
            return res.status(400).json({
                message: "Store owner id is required."
            });
        }

        const existing = await findStoreOwnerById(ownerId);

        if (!existing) {
            return res.status(404).json({
                message: "Store owner not found."
            });
        }

        const stores = await listStoresByOwner(ownerId);

        for (const store of stores) {
            await deleteStoreRatingsByStoreId(store.id);
            await deleteStoreById(store.id, ownerId);

            if (store.image_public_id) {
                await cloudinary.uploader.destroy(store.image_public_id).catch(() => null);
            }
        }

        await deleteStoreOwnerById(ownerId);

        return res.status(200).json({
            message: "Store owner deleted.",
            removedStores: stores.length
        });
    } catch (error) {
        console.error("Admin delete store owner failed:", error);
        return res.status(500).json({
            message: "Unable to delete store owner right now."
        });
    }
};

export const deleteStoreAsAdmin = async (req, res) => {
    try {
        const storeId = normalizeId(req.params?.storeId);

        if (!storeId) {
            return res.status(400).json({
                message: "Store id is required."
            });
        }

        const store = await findStoreById(storeId);

        if (!store) {
            return res.status(404).json({
                message: "Store not found."
            });
        }

        await deleteStoreRatingsByStoreId(storeId);
        await deleteStoreById(storeId, store.owner_id);

        if (store.image_public_id) {
            await cloudinary.uploader.destroy(store.image_public_id).catch(() => null);
        }

        return res.status(200).json({
            message: "Store deleted."
        });
    } catch (error) {
        console.error("Admin delete store failed:", error);
        return res.status(500).json({
            message: "Unable to delete store right now."
        });
    }
};
