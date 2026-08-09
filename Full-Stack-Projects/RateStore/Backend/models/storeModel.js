import db from "../config/db.js";

const dbPromise = db.promise();

const storeWithRatingsSelect = `SELECT s.id, s.owner_id, s.name, s.description, s.address, s.category,
    s.image_url, s.image_public_id, s.created_at, s.updated_at,
    COALESCE(AVG(r.rating), 0) AS average_rating,
    COUNT(r.id) AS review_count
    FROM stores s
    LEFT JOIN store_ratings r ON r.store_id = s.id`;

export const ensureStoresTable = async () => {
    const createSql = `CREATE TABLE IF NOT EXISTS stores (
        id VARCHAR(36) NOT NULL PRIMARY KEY,
        owner_id INT NOT NULL,
        name VARCHAR(150) NOT NULL,
        description TEXT NOT NULL,
        address VARCHAR(255) NOT NULL,
        category VARCHAR(120) NOT NULL,
        image_url VARCHAR(500) NOT NULL,
        image_public_id VARCHAR(200) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX owner_idx (owner_id)
    )`;

    await dbPromise.query(createSql);
    await dbPromise.query("ALTER TABLE stores MODIFY id VARCHAR(36) NOT NULL").catch(() => null);
};

export const createStore = async ({ storeId, ownerId, name, description, address, category, imageUrl, imagePublicId }) => {
    await dbPromise.query(
        "INSERT INTO stores (id, owner_id, name, description, address, category, image_url, image_public_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [storeId, ownerId, name, description, address, category, imageUrl, imagePublicId]
    );

    return storeId;
};

export const listStoresByOwner = async (ownerId) => {
    const [rows] = await dbPromise.query(
        "SELECT id, owner_id, name, description, address, category, image_url, image_public_id, created_at, updated_at FROM stores WHERE owner_id = ? ORDER BY created_at DESC",
        [ownerId]
    );

    return rows;
};

export const listAllStores = async () => {
    const [rows] = await dbPromise.query(
        "SELECT id, owner_id, name, description, address, category, image_url, image_public_id, created_at, updated_at FROM stores ORDER BY created_at DESC"
    );

    return rows;
};

export const listAllStoresWithStats = async () => {
    const [rows] = await dbPromise.query(
        `${storeWithRatingsSelect} GROUP BY s.id ORDER BY s.created_at DESC`
    );

    return rows;
};

export const findStoreById = async (storeId) => {
    const [rows] = await dbPromise.query(
        "SELECT id, owner_id, name, description, address, category, image_url, image_public_id, created_at, updated_at FROM stores WHERE id = ? LIMIT 1",
        [storeId]
    );

    return rows[0] || null;
};

export const findStoreByIdWithStats = async (storeId) => {
    const [rows] = await dbPromise.query(
        `${storeWithRatingsSelect} WHERE s.id = ? GROUP BY s.id LIMIT 1`,
        [storeId]
    );

    return rows[0] || null;
};

export const listStoresByOwnerWithStats = async (ownerId) => {
    const [rows] = await dbPromise.query(
        `${storeWithRatingsSelect} WHERE s.owner_id = ? GROUP BY s.id ORDER BY s.created_at DESC`,
        [ownerId]
    );

    return rows;
};

export const updateStoreById = async ({ storeId, ownerId, name, description, address, category, imageUrl, imagePublicId }) => {
    const [result] = await dbPromise.query(
        "UPDATE stores SET name = ?, description = ?, address = ?, category = ?, image_url = ?, image_public_id = ? WHERE id = ? AND owner_id = ?",
        [name, description, address, category, imageUrl, imagePublicId, storeId, ownerId]
    );

    return result.affectedRows;
};

export const deleteStoreById = async (storeId, ownerId) => {
    const [result] = await dbPromise.query(
        "DELETE FROM stores WHERE id = ? AND owner_id = ?",
        [storeId, ownerId]
    );

    return result.affectedRows;
};
