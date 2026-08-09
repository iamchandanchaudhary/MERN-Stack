import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const ensureDefaultAdmin = async () => {
    const adminIdentifier = (
        process.env.ADMIN_IDENTIFIER || "admin@ams.com"
    ).trim().toLowerCase();
    const adminPassword = (process.env.ADMIN_PASSWORD || "admin123@").trim();
    const adminName = (process.env.ADMIN_NAME || "System Admin").trim();

    if (!adminIdentifier || !adminPassword || !adminName) {
        throw new Error("Admin seed details are missing in environment variables.");
    }

    const existingAdmin = await User.findOne({
        role: "admin",
        identifier: adminIdentifier,
    });

    if (existingAdmin) {
        existingAdmin.name = adminName;
        existingAdmin.passwordHash = await bcrypt.hash(adminPassword, 10);
        await existingAdmin.save();
        return existingAdmin;
    }

    const passwordHash = await bcrypt.hash(adminPassword, 10);

    const admin = await User.create({
        role: "admin",
        name: adminName,
        identifier: adminIdentifier,
        passwordHash,
    });

    console.log(`Default admin created: ${adminIdentifier}`);
    return admin;
};
