import mongoose from "mongoose";
import Attendance from "../models/Attendance.js";
import User from "../models/User.js";

const DATE_KEY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const getTodayDateKey = () => new Date().toISOString().slice(0, 10);

const normalizeString = (value) => String(value || "").trim().toLowerCase();

const getTeacherUser = async (teacherId) => {
    const teacher = await User.findOne({ _id: teacherId, role: "teacher" }).select(
        "_id departments subjects",
    );

    if (!teacher) {
        return null;
    }

    const departments = [...new Set((teacher.departments || []).map(normalizeString))].filter(
        Boolean,
    );
    const subjects = [...new Set((teacher.subjects || []).map(normalizeString))].filter(Boolean);

    return {
        teacher,
        departments,
        subjects,
    };
};

const getDepartmentSubjectMap = (students, teacherDepartments, teacherSubjects) => {
    const teacherSubjectSet = new Set(teacherSubjects);
    const map = teacherDepartments.reduce((accumulator, department) => {
        accumulator[department] = new Set();
        return accumulator;
    }, {});

    students.forEach((student) => {
        const studentDepartments = Array.isArray(student.departments)
            ? student.departments.map(normalizeString)
            : [];
        const studentSubjects = Array.isArray(student.subjects)
            ? student.subjects.map(normalizeString)
            : [];

        studentDepartments.forEach((department) => {
            if (!map[department]) {
                return;
            }

            studentSubjects.forEach((subject) => {
                if (teacherSubjectSet.has(subject)) {
                    map[department].add(subject);
                }
            });
        });
    });

    teacherDepartments.forEach((department) => {
        if (map[department].size === 0) {
            teacherSubjects.forEach((subject) => map[department].add(subject));
        }
    });

    return Object.fromEntries(
        Object.entries(map).map(([department, subjectSet]) => [
            department,
            Array.from(subjectSet),
        ]),
    );
};

const getClassesAssignedCount = (departmentSubjectMap) => {
    return Object.values(departmentSubjectMap).reduce(
        (total, subjects) => total + subjects.length,
        0,
    );
};

export const getTeacherDashboardSummary = async (req, res) => {
    try {
        const teacherScope = await getTeacherUser(req.user.id);

        if (!teacherScope) {
            return res.status(404).json({
                success: false,
                message: "Teacher account not found.",
            });
        }

        const { teacher, departments, subjects } = teacherScope;

        const students = await User.find({
            role: "student",
            departments: { $in: departments },
            subjects: { $in: subjects },
        }).select("departments subjects");

        const departmentSubjectMap = getDepartmentSubjectMap(students, departments, subjects);
        const attendanceMarkedToday = await Attendance.countDocuments({
            teacher: teacher._id,
            dateKey: getTodayDateKey(),
        });

        return res.status(200).json({
            success: true,
            summary: {
                classesAssigned: getClassesAssignedCount(departmentSubjectMap),
                attendanceMarkedToday,
                subjectsAssigned: subjects.length,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch teacher dashboard summary right now.",
            error: error.message,
        });
    }
};

export const getTeacherAttendanceMeta = async (req, res) => {
    try {
        const teacherScope = await getTeacherUser(req.user.id);

        if (!teacherScope) {
            return res.status(404).json({
                success: false,
                message: "Teacher account not found.",
            });
        }

        const { teacher, departments, subjects } = teacherScope;

        const students = await User.find({
            role: "student",
            departments: { $in: departments },
            subjects: { $in: subjects },
        }).select("departments subjects");

        const departmentSubjectMap = getDepartmentSubjectMap(students, departments, subjects);
        const attendanceMarkedToday = await Attendance.countDocuments({
            teacher: teacher._id,
            dateKey: getTodayDateKey(),
        });

        return res.status(200).json({
            success: true,
            options: {
                departments,
                subjects,
                departmentSubjectMap,
            },
            summary: {
                classesAssigned: getClassesAssignedCount(departmentSubjectMap),
                attendanceMarkedToday,
                subjectsAssigned: subjects.length,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch attendance metadata right now.",
            error: error.message,
        });
    }
};

export const getStudentsForAttendance = async (req, res) => {
    try {
        const teacherScope = await getTeacherUser(req.user.id);

        if (!teacherScope) {
            return res.status(404).json({
                success: false,
                message: "Teacher account not found.",
            });
        }

        const department = normalizeString(req.query.department);
        const subject = normalizeString(req.query.subject);

        if (!department || !subject) {
            return res.status(400).json({
                success: false,
                message: "Department and subject are required.",
            });
        }

        if (!teacherScope.departments.includes(department)) {
            return res.status(403).json({
                success: false,
                message: "You are not assigned to the selected department.",
            });
        }

        if (!teacherScope.subjects.includes(subject)) {
            return res.status(403).json({
                success: false,
                message: "You are not assigned to the selected subject.",
            });
        }

        const students = await User.find({
            role: "student",
            departments: department,
            subjects: subject,
        })
            .select("_id name identifier departments subjects")
            .sort({ name: 1, identifier: 1 });

        return res.status(200).json({
            success: true,
            students: students.map((student) => ({
                id: student._id,
                name: student.name,
                identifier: student.identifier,
                departments: Array.isArray(student.departments) ? student.departments : [],
                subjects: Array.isArray(student.subjects) ? student.subjects : [],
            })),
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch students for attendance right now.",
            error: error.message,
        });
    }
};

export const submitTeacherAttendance = async (req, res) => {
    try {
        const teacherScope = await getTeacherUser(req.user.id);

        if (!teacherScope) {
            return res.status(404).json({
                success: false,
                message: "Teacher account not found.",
            });
        }

        const department = normalizeString(req.body.department);
        const subject = normalizeString(req.body.subject);
        const attendanceDate = normalizeString(req.body.date) || getTodayDateKey();
        const records = Array.isArray(req.body.records) ? req.body.records : [];

        if (!department || !subject) {
            return res.status(400).json({
                success: false,
                message: "Department and subject are required.",
            });
        }

        if (!DATE_KEY_PATTERN.test(attendanceDate)) {
            return res.status(400).json({
                success: false,
                message: "Invalid attendance date format. Use YYYY-MM-DD.",
            });
        }

        if (!teacherScope.departments.includes(department)) {
            return res.status(403).json({
                success: false,
                message: "You are not assigned to the selected department.",
            });
        }

        if (!teacherScope.subjects.includes(subject)) {
            return res.status(403).json({
                success: false,
                message: "You are not assigned to the selected subject.",
            });
        }

        if (records.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide attendance records for students.",
            });
        }

        const normalizedRecordMap = new Map();

        records.forEach((record) => {
            const studentId = String(record?.studentId || "").trim();
            const status = normalizeString(record?.status);

            if (
                mongoose.Types.ObjectId.isValid(studentId) &&
                (status === "present" || status === "absent")
            ) {
                normalizedRecordMap.set(studentId, {
                    student: studentId,
                    status,
                });
            }
        });

        if (normalizedRecordMap.size === 0) {
            return res.status(400).json({
                success: false,
                message: "Attendance records are invalid.",
            });
        }

        const studentIds = Array.from(normalizedRecordMap.keys()).map(
            (id) => new mongoose.Types.ObjectId(id),
        );

        const eligibleStudents = await User.find({
            _id: { $in: studentIds },
            role: "student",
            departments: department,
            subjects: subject,
        }).select("_id");

        const eligibleStudentIdSet = new Set(
            eligibleStudents.map((student) => student._id.toString()),
        );

        const invalidStudentIds = Array.from(normalizedRecordMap.keys()).filter(
            (studentId) => !eligibleStudentIdSet.has(studentId),
        );

        if (invalidStudentIds.length > 0) {
            return res.status(400).json({
                success: false,
                message: "One or more students are not eligible for the selected class.",
            });
        }

        const finalizedRecords = Array.from(normalizedRecordMap.entries())
            .filter(([studentId]) => eligibleStudentIdSet.has(studentId))
            .map(([, record]) => record);

        const existingEntry = await Attendance.findOne({
            teacher: teacherScope.teacher._id,
            department,
            subject,
            dateKey: attendanceDate,
        }).select("_id");

        await Attendance.findOneAndUpdate(
            {
                teacher: teacherScope.teacher._id,
                department,
                subject,
                dateKey: attendanceDate,
            },
            {
                $set: {
                    records: finalizedRecords,
                },
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true,
            },
        );

        return res.status(200).json({
            success: true,
            message: existingEntry
                ? "Attendance updated successfully."
                : "Attendance submitted successfully.",
            summary: {
                totalStudents: finalizedRecords.length,
                presentCount: finalizedRecords.filter((record) => record.status === "present")
                    .length,
                absentCount: finalizedRecords.filter((record) => record.status === "absent")
                    .length,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to submit attendance right now.",
            error: error.message,
        });
    }
};
