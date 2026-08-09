import db from "../config/db.js";

const dbPromise = db.promise();

export const ensureStoreOwnersTable = async () => {
    const createSql = `CREATE TABLE IF NOT EXISTS store_owners (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(190) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        role VARCHAR(40) NOT NULL DEFAULT 'store-owner',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    await dbPromise.query(createSql);
};

export const findStoreOwnerByEmail = async (email) => {
    const [rows] = await dbPromise.query(
        "SELECT id, name, email, address, password_hash, role FROM store_owners WHERE email = ? LIMIT 1",
        [email]
    );

    return rows[0] || null;
};

export const findStoreOwnerById = async (ownerId) => {
    const [rows] = await dbPromise.query(
        "SELECT id, name, email, address, password_hash, role FROM store_owners WHERE id = ? LIMIT 1",
        [ownerId]
    );

    return rows[0] || null;
};

export const createStoreOwner = async ({ name, email, address, passwordHash }) => {
    const [result] = await dbPromise.query(
        "INSERT INTO store_owners (name, email, address, password_hash, role) VALUES (?, ?, ?, ?, 'store-owner')",
        [name, email, address, passwordHash]
    );

    return result.insertId;
};

export const updateStoreOwnerProfileById = async ({ ownerId, name, address }) => {
    const [result] = await dbPromise.query(
        "UPDATE store_owners SET name = ?, address = ? WHERE id = ?",
        [name, address, ownerId]
    );

    return result.affectedRows;
};

export const updateStoreOwnerPasswordById = async ({ ownerId, passwordHash }) => {
    const [result] = await dbPromise.query(
        "UPDATE store_owners SET password_hash = ? WHERE id = ?",
        [passwordHash, ownerId]
    );

    return result.affectedRows;
};

export const listStoreOwners = async () => {
    const [rows] = await dbPromise.query(
        "SELECT id, name, email, address, role, created_at FROM store_owners ORDER BY created_at DESC"
    );

    return rows;
};

export const deleteStoreOwnerById = async (ownerId) => {
    const [result] = await dbPromise.query(
        "DELETE FROM store_owners WHERE id = ?",
        [ownerId]
    );

    return result.affectedRows;
};
