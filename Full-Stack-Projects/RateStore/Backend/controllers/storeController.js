import { randomUUID } from "crypto";
import { v2 as cloudinary } from "cloudinary";
import {
    createStore,
    deleteStoreById,
    findStoreById,
    findStoreByIdWithStats,
    listAllStoresWithStats,
    listStoresByOwnerWithStats,
    updateStoreById
} from "../models/storeModel.js";
import { getUserRatingForStore, upsertStoreRating } from "../models/storeRatingModel.js";

const normalizeText = (value) => (typeof value === "string" ? value.trim() : "");

const parseOwnerId = (value) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? null : parsed;
};

const normalizeId = (value) => (typeof value === "string" ? value.trim() : "");

const bufferToDataUri = (file) => `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

const parseNumber = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
};

const buildStorePayload = (store) => ({
    id: store.id,
    ownerId: store.owner_id,
    name: store.name,
    description: store.description,
    address: store.address,
    category: store.category,
    imageUrl: store.image_url,
    imagePublicId: store.image_public_id,
    averageRating: parseNumber(store.average_rating ?? store.averageRating),
    reviewCount: parseNumber(store.review_count ?? store.reviewCount),
    createdAt: store.created_at,
    updatedAt: store.updated_at
});

export const createStoreEntry = async (req, res) => {
    try {
        const ownerId = parseOwnerId(req.body?.ownerId);
        const name = normalizeText(req.body?.name);
        const description = normalizeText(req.body?.description);
        const address = normalizeText(req.body?.address);
        const category = normalizeText(req.body?.category);
        const imageFile = req.file;

        if (!ownerId || !name || !description || !address || !category || !imageFile) {
            return res.status(400).json({
                message: "Owner, store name, description, address, category, and image are required."
            });
        }

        if (!imageFile.mimetype?.startsWith("image/")) {
            return res.status(400).json({
                message: "Store image must be a valid image file."
            });
        }

        const uploadResult = await cloudinary.uploader.upload(bufferToDataUri(imageFile), {
            folder: "ratestore/stores"
        });

        const storeId = randomUUID();

        await createStore({
            storeId,
            ownerId,
            name,
            description,
            address,
            category,
            imageUrl: uploadResult.secure_url,
            imagePublicId: uploadResult.public_id
        });

        const store = await findStoreByIdWithStats(storeId);

        return res.status(201).json({
            store: store ? buildStorePayload(store) : null
        });
    } catch (error) {
        console.error("Store creation failed:", error);
        return res.status(500).json({
            message: "Unable to create store right now."
        });
    }
};

export const listStoresForOwner = async (req, res) => {
    try {
        const ownerId = parseOwnerId(req.params?.ownerId);

        if (!ownerId) {
            return res.status(400).json({
                message: "Owner id is required."
            });
        }

        const stores = await listStoresByOwnerWithStats(ownerId);

        return res.status(200).json({
            stores: stores.map(buildStorePayload)
        });
    } catch (error) {
        console.error("Store list failed:", error);
        return res.status(500).json({
            message: "Unable to load stores right now."
        });
    }
};

export const listStoresForUsers = async (req, res) => {
    try {
        const stores = await listAllStoresWithStats();

        return res.status(200).json({
            stores: stores.map(buildStorePayload)
        });
    } catch (error) {
        console.error("Store list for users failed:", error);
        return res.status(500).json({
            message: "Unable to load stores right now."
        });
    }
};

export const getStoreDetails = async (req, res) => {
    try {
        const storeId = normalizeId(req.params?.storeId);
        const userId = parseOwnerId(req.query?.userId);

        if (!storeId) {
            return res.status(400).json({
                message: "Store id is required."
            });
        }

        const store = await findStoreByIdWithStats(storeId);

        if (!store) {
            return res.status(404).json({
                message: "Store not found."
            });
        }

        const payload = buildStorePayload(store);

        if (userId) {
            const userRating = await getUserRatingForStore(storeId, userId);
            payload.userRating = userRating ? Number(userRating) : 0;
        }

        return res.status(200).json({
            store: payload
        });
    } catch (error) {
        console.error("Store details failed:", error);
        return res.status(500).json({
            message: "Unable to load store details right now."
        });
    }
};

export const updateStoreEntry = async (req, res) => {
    try {
        const storeId = normalizeId(req.params?.storeId);
        const ownerId = parseOwnerId(req.body?.ownerId);
        const name = normalizeText(req.body?.name);
        const description = normalizeText(req.body?.description);
        const address = normalizeText(req.body?.address);
        const category = normalizeText(req.body?.category);
        const imageFile = req.file;

        if (!storeId || !ownerId || !name || !description || !address || !category) {
            return res.status(400).json({
                message: "Owner, store name, description, address, and category are required."
            });
        }

        const existing = await findStoreById(storeId);

        if (!existing) {
            return res.status(404).json({
                message: "Store not found."
            });
        }

        if (Number(existing.owner_id) !== ownerId) {
            return res.status(403).json({
                message: "You are not allowed to update this store."
            });
        }

        let imageUrl = existing.image_url;
        let imagePublicId = existing.image_public_id;

        if (imageFile) {
            if (!imageFile.mimetype?.startsWith("image/")) {
                return res.status(400).json({
                    message: "Store image must be a valid image file."
                });
            }

            const uploadResult = await cloudinary.uploader.upload(bufferToDataUri(imageFile), {
                folder: "ratestore/stores"
            });

            imageUrl = uploadResult.secure_url;
            imagePublicId = uploadResult.public_id;

            if (existing.image_public_id) {
                await cloudinary.uploader.destroy(existing.image_public_id).catch(() => null);
            }
        }

        await updateStoreById({
            storeId,
            ownerId,
            name,
            description,
            address,
            category,
            imageUrl,
            imagePublicId
        });

        const updated = await findStoreByIdWithStats(storeId);
        const payload = updated ? buildStorePayload(updated) : null;

        return res.status(200).json({
            store: payload
        });
    } catch (error) {
        console.error("Store update failed:", error);
        return res.status(500).json({
            message: "Unable to update store right now."
        });
    }
};

export const rateStore = async (req, res) => {
    try {
        const storeId = normalizeId(req.params?.storeId);
        const userId = Number.parseInt(req.body?.userId, 10);
        const rating = Number(req.body?.rating);

        if (!storeId || !userId || !Number.isFinite(rating)) {
            return res.status(400).json({
                message: "Store id, user id, and rating are required."
            });
        }

        if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
            return res.status(400).json({
                message: "Rating must be between 1 and 5."
            });
        }

        const existing = await findStoreById(storeId);

        if (!existing) {
            return res.status(404).json({
                message: "Store not found."
            });
        }

        await upsertStoreRating({ storeId, userId, rating });

        const updated = await findStoreByIdWithStats(storeId);

        return res.status(200).json({
            store: updated ? buildStorePayload(updated) : null
        });
    } catch (error) {
        console.error("Store rating failed:", error);
        return res.status(500).json({
            message: "Unable to save rating right now."
        });
    }
};

export const deleteStoreEntry = async (req, res) => {
    try {
        const storeId = normalizeId(req.params?.storeId);
        const ownerId = parseOwnerId(req.body?.ownerId || req.query?.ownerId);

        if (!storeId || !ownerId) {
            return res.status(400).json({
                message: "Store id and owner id are required."
            });
        }

        const existing = await findStoreById(storeId);

        if (!existing) {
            return res.status(404).json({
                message: "Store not found."
            });
        }

        if (Number(existing.owner_id) !== ownerId) {
            return res.status(403).json({
                message: "You are not allowed to delete this store."
            });
        }

        await deleteStoreById(storeId, ownerId);

        if (existing.image_public_id) {
            await cloudinary.uploader.destroy(existing.image_public_id).catch(() => null);
        }

        return res.status(200).json({
            message: "Store deleted."
        });
    } catch (error) {
        console.error("Store deletion failed:", error);
        return res.status(500).json({
            message: "Unable to delete store right now."
        });
    }
};
