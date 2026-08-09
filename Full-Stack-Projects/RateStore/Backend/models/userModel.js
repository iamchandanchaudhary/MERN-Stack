import db from "../config/db.js";

const dbPromise = db.promise();

export const ensureUsersTable = async () => {
    const createSql = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(190) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        role VARCHAR(40) NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    await dbPromise.query(createSql);
};

export const findUserByEmail = async (email) => {
    const [rows] = await dbPromise.query(
        "SELECT id, name, email, address, password_hash, role FROM users WHERE email = ? LIMIT 1",
        [email]
    );

    return rows[0] || null;
};

export const findUserById = async (userId) => {
    const [rows] = await dbPromise.query(
        "SELECT id, name, email, address, password_hash, role FROM users WHERE id = ? LIMIT 1",
        [userId]
    );

    return rows[0] || null;
};

export const createUser = async ({ name, email, address, passwordHash }) => {
    const [result] = await dbPromise.query(
        "INSERT INTO users (name, email, address, password_hash, role) VALUES (?, ?, ?, ?, 'user')",
        [name, email, address, passwordHash]
    );

    return result.insertId;
};

export const updateUserProfileById = async ({ userId, name, address }) => {
    const [result] = await dbPromise.query(
        "UPDATE users SET name = ?, address = ? WHERE id = ?",
        [name, address, userId]
    );

    return result.affectedRows;
};

export const updateUserPasswordById = async ({ userId, passwordHash }) => {
    const [result] = await dbPromise.query(
        "UPDATE users SET password_hash = ? WHERE id = ?",
        [passwordHash, userId]
    );

    return result.affectedRows;
};

export const listUsers = async () => {
    const [rows] = await dbPromise.query(
        "SELECT id, name, email, address, role, created_at FROM users ORDER BY created_at DESC"
    );

    return rows;
};

export const deleteUserById = async (userId) => {
    const [result] = await dbPromise.query(
        "DELETE FROM users WHERE id = ?",
        [userId]
    );

    return result.affectedRows;
};
