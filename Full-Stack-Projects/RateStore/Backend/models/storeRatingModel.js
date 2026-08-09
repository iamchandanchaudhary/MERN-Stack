import db from "../config/db.js";

const dbPromise = db.promise();

export const ensureStoreRatingsTable = async () => {
    const createSql = `CREATE TABLE IF NOT EXISTS store_ratings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        store_id VARCHAR(36) NOT NULL,
        user_id INT NOT NULL,
        rating TINYINT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY store_user_unique (store_id, user_id),
        INDEX store_idx (store_id),
        INDEX user_idx (user_id)
    )`;

    await dbPromise.query(createSql);
    await dbPromise.query("ALTER TABLE store_ratings MODIFY store_id VARCHAR(36) NOT NULL").catch(() => null);
};

export const upsertStoreRating = async ({ storeId, userId, rating }) => {
    const [result] = await dbPromise.query(
        "INSERT INTO store_ratings (store_id, user_id, rating) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating = VALUES(rating), updated_at = CURRENT_TIMESTAMP",
        [storeId, userId, rating]
    );

    return result.affectedRows;
};

export const getStoreRatingSummary = async (storeId) => {
    const [rows] = await dbPromise.query(
        "SELECT COUNT(*) AS review_count, AVG(rating) AS average_rating FROM store_ratings WHERE store_id = ?",
        [storeId]
    );

    return rows[0] || { review_count: 0, average_rating: 0 };
};

export const getUserRatingForStore = async (storeId, userId) => {
    const [rows] = await dbPromise.query(
        "SELECT rating FROM store_ratings WHERE store_id = ? AND user_id = ? LIMIT 1",
        [storeId, userId]
    );

    return rows[0]?.rating ?? null;
};

export const deleteStoreRatingsByStoreId = async (storeId) => {
    const [result] = await dbPromise.query(
        "DELETE FROM store_ratings WHERE store_id = ?",
        [storeId]
    );

    return result.affectedRows;
};

export const deleteStoreRatingsByUserId = async (userId) => {
    const [result] = await dbPromise.query(
        "DELETE FROM store_ratings WHERE user_id = ?",
        [userId]
    );

    return result.affectedRows;
};
