import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User, { DEPARTMENT_OPTIONS, SUBJECT_OPTIONS } from "../models/User.js";

const MANAGED_ROLES = ["teacher", "student"];
const DEPARTMENT_OPTIONS_SET = new Set(DEPARTMENT_OPTIONS);
const SUBJECT_OPTIONS_SET = new Set(SUBJECT_OPTIONS);

const normalizeStringArray = (values) => {
    if (!Array.isArray(values)) {
        return [];
    }

    const normalizedValues = values
        .map((value) => String(value || "").trim().toLowerCase())
        .filter(Boolean);

    return [...new Set(normalizedValues)];
};

const getAssignmentValidationError = (role, departments, subjects) => {
    if (departments.length === 0) {
        return "At least one department must be assigned.";
    }

    if (subjects.length === 0) {
        return "At least one subject must be assigned.";
    }

    if (role === "student" && departments.length !== 1) {
        return "Student must have exactly one department.";
    }

    const hasInvalidDepartment = departments.some(
        (department) => !DEPARTMENT_OPTIONS_SET.has(department),
    );

    if (hasInvalidDepartment) {
        return "One or more selected departments are invalid.";
    }

    const hasInvalidSubject = subjects.some(
        (subject) => !SUBJECT_OPTIONS_SET.has(subject),
    );

    if (hasInvalidSubject) {
        return "One or more selected subjects are invalid.";
    }

    return "";
};

const sanitizeUser = (user) => ({
    id: user._id,
    name: user.name,
    identifier: user.identifier,
    role: user.role,
    createdBy: user.createdBy,
    departments: Array.isArray(user.departments) ? user.departments : [],
    subjects: Array.isArray(user.subjects) ? user.subjects : [],
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});

export const createManagedUser = async (req, res) => {
    try {
        const { role, name, identifier, password, departments, subjects } = req.body;

        if (!role || !name || !identifier || !password) {
            return res.status(400).json({
                success: false,
                message: "Role, name, identifier, and password are required.",
            });
        }

        const normalizedRole = String(role).trim().toLowerCase();
        const normalizedIdentifier = String(identifier).trim().toLowerCase();
        const trimmedName = String(name).trim();
        const normalizedDepartments = normalizeStringArray(departments);
        const normalizedSubjects = normalizeStringArray(subjects);

        if (!MANAGED_ROLES.includes(normalizedRole)) {
            return res.status(400).json({
                success: false,
                message: "Admin can only create teacher or student accounts.",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long.",
            });
        }

        const assignmentValidationError = getAssignmentValidationError(
            normalizedRole,
            normalizedDepartments,
            normalizedSubjects,
        );

        if (assignmentValidationError) {
            return res.status(400).json({
                success: false,
                message: assignmentValidationError,
            });
        }

        const existingUser = await User.findOne({ identifier: normalizedIdentifier });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Identifier already exists. Please use a unique identifier.",
            });
        }

        const passwordHash = await bcrypt.hash(String(password), 10);

        const newUser = await User.create({
            role: normalizedRole,
            name: trimmedName,
            identifier: normalizedIdentifier,
            passwordHash,
            createdBy: req.user.id,
            departments: normalizedDepartments,
            subjects: normalizedSubjects,
        });

        return res.status(201).json({
            success: true,
            message: `${normalizedRole} account created successfully.`,
            user: sanitizeUser(newUser),
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create user right now.",
            error: error.message,
        });
    }
};

export const getManagedUsers = async (req, res) => {
    try {
        const queryRole = String(req.query.role || "").trim().toLowerCase();

        const filters = {
            role: MANAGED_ROLES.includes(queryRole)
                ? queryRole
                : { $in: MANAGED_ROLES },
        };

        const users = await User.find(filters)
            .select(
                "name identifier role createdBy departments subjects createdAt updatedAt",
            )
            .sort({ createdAt: -1 });

        const [teacherCount, studentCount] = await Promise.all([
            User.countDocuments({ role: "teacher" }),
            User.countDocuments({ role: "student" }),
        ]);

        return res.status(200).json({
            success: true,
            users: users.map(sanitizeUser),
            summary: {
                teachers: teacherCount,
                students: studentCount,
                totalManaged: teacherCount + studentCount,
            },
            options: {
                departments: DEPARTMENT_OPTIONS,
                subjects: SUBJECT_OPTIONS,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch users right now.",
            error: error.message,
        });
    }
};

export const updateManagedUser = async (req, res) => {
    try {
        const userId = String(req.params.userId || "").trim();

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user id.",
            });
        }

        const existingUser = await User.findOne({
            _id: userId,
            role: { $in: MANAGED_ROLES },
        });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "Teacher or student user not found.",
            });
        }

        const hasPasswordField = typeof req.body.password === "string";
        const nextPassword = hasPasswordField ? String(req.body.password) : "";

        if (hasPasswordField && nextPassword && nextPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long.",
            });
        }

        const nextName =
            req.body.name !== undefined
                ? String(req.body.name).trim()
                : existingUser.name;
        const nextIdentifier =
            req.body.identifier !== undefined
                ? String(req.body.identifier).trim().toLowerCase()
                : existingUser.identifier;
        const nextDepartments =
            req.body.departments !== undefined
                ? normalizeStringArray(req.body.departments)
                : normalizeStringArray(existingUser.departments);
        const nextSubjects =
            req.body.subjects !== undefined
                ? normalizeStringArray(req.body.subjects)
                : normalizeStringArray(existingUser.subjects);

        if (req.body.role && String(req.body.role).trim().toLowerCase() !== existingUser.role) {
            return res.status(400).json({
                success: false,
                message: "Role cannot be changed for existing accounts.",
            });
        }

        if (!nextName || !nextIdentifier) {
            return res.status(400).json({
                success: false,
                message: "Name and identifier are required.",
            });
        }

        const assignmentValidationError = getAssignmentValidationError(
            existingUser.role,
            nextDepartments,
            nextSubjects,
        );

        if (assignmentValidationError) {
            return res.status(400).json({
                success: false,
                message: assignmentValidationError,
            });
        }

        if (nextIdentifier !== existingUser.identifier) {
            const identifierOwner = await User.findOne({ identifier: nextIdentifier });

            if (identifierOwner) {
                return res.status(409).json({
                    success: false,
                    message: "Identifier already exists. Please use a unique identifier.",
                });
            }
        }

        const updatePayload = {
            name: nextName,
            identifier: nextIdentifier,
            departments: nextDepartments,
            subjects: nextSubjects,
        };

        if (hasPasswordField && nextPassword) {
            updatePayload.passwordHash = await bcrypt.hash(nextPassword, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updatePayload },
            { new: true, runValidators: true },
        );

        return res.status(200).json({
            success: true,
            message: `${existingUser.role} account updated successfully.`,
            user: sanitizeUser(updatedUser),
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update user right now.",
            error: error.message,
        });
    }
};

export const deleteManagedUser = async (req, res) => {
    try {
        const userId = String(req.params.userId || "").trim();

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user id.",
            });
        }

        const deletedUser = await User.findOneAndDelete({
            _id: userId,
            role: { $in: MANAGED_ROLES },
        });

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "Teacher or student user not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: `${deletedUser.role} account deleted successfully.`,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete user right now.",
            error: error.message,
        });
    }
};
