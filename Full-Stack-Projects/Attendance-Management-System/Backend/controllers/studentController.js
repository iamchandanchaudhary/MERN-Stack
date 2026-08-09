import mongoose from "mongoose";
import Attendance from "../models/Attendance.js";
import User from "../models/User.js";

const DATE_KEY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const normalizeString = (value) => String(value || "").trim().toLowerCase();

const calculateRate = (presentCount, totalCount) => {
    if (!totalCount) {
        return 0;
    }

    return Math.round((presentCount / totalCount) * 100);
};

export const getStudentAttendance = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid student identifier.",
            });
        }

        const student = await User.findOne({
            _id: req.user.id,
            role: "student",
        }).select("_id subjects");

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student account not found.",
            });
        }

        const subject = normalizeString(req.query.subject);
        const date = normalizeString(req.query.date);
        const dateFrom = normalizeString(req.query.dateFrom);
        const dateTo = normalizeString(req.query.dateTo);

        if (subject && !student.subjects.includes(subject)) {
            return res.status(403).json({
                success: false,
                message: "You are not assigned to the selected subject.",
            });
        }

        if (date && !DATE_KEY_PATTERN.test(date)) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format. Use YYYY-MM-DD.",
            });
        }

        if (dateFrom && !DATE_KEY_PATTERN.test(dateFrom)) {
            return res.status(400).json({
                success: false,
                message: "Invalid start date format. Use YYYY-MM-DD.",
            });
        }

        if (dateTo && !DATE_KEY_PATTERN.test(dateTo)) {
            return res.status(400).json({
                success: false,
                message: "Invalid end date format. Use YYYY-MM-DD.",
            });
        }

        if (dateFrom && dateTo && dateFrom > dateTo) {
            return res.status(400).json({
                success: false,
                message: "Start date cannot be after end date.",
            });
        }

        const query = {
            records: {
                $elemMatch: {
                    student: student._id,
                },
            },
        };

        if (subject) {
            query.subject = subject;
        }

        if (date) {
            query.dateKey = date;
        } else if (dateFrom || dateTo) {
            query.dateKey = {};

            if (dateFrom) {
                query.dateKey.$gte = dateFrom;
            }

            if (dateTo) {
                query.dateKey.$lte = dateTo;
            }
        }

        const attendanceDocs = await Attendance.find(query)
            .sort({ dateKey: -1, subject: 1 })
            .populate("teacher", "name identifier");

        const rows = attendanceDocs
            .map((entry) => {
                const record = entry.records.find(
                    (item) => item.student?.toString() === student._id.toString(),
                );

                if (!record) {
                    return null;
                }

                return {
                    id: entry._id,
                    date: entry.dateKey,
                    department: entry.department,
                    subject: entry.subject,
                    status: record.status,
                    teacherName: entry.teacher?.name || "",
                    teacherIdentifier: entry.teacher?.identifier || "",
                    updatedAt: entry.updatedAt,
                };
            })
            .filter(Boolean);

        const assignedSubjects = Array.isArray(student.subjects)
            ? student.subjects.filter(Boolean)
            : [];

        const subjectSummaryMap = new Map(
            assignedSubjects.map((assignedSubject) => [
                assignedSubject,
                {
                    subject: assignedSubject,
                    totalClasses: 0,
                    presentCount: 0,
                    absentCount: 0,
                },
            ]),
        );

        rows.forEach((row) => {
            const current = subjectSummaryMap.get(row.subject) || {
                subject: row.subject,
                totalClasses: 0,
                presentCount: 0,
                absentCount: 0,
            };

            current.totalClasses += 1;

            if (row.status === "present") {
                current.presentCount += 1;
            } else {
                current.absentCount += 1;
            }

            subjectSummaryMap.set(row.subject, current);
        });

        const subjectSummary = Array.from(subjectSummaryMap.values())
            .map((summary) => ({
                ...summary,
                attendanceRate: calculateRate(summary.presentCount, summary.totalClasses),
            }))
            .sort((a, b) => a.subject.localeCompare(b.subject));

        const totalClasses = rows.length;
        const presentCount = rows.filter((row) => row.status === "present").length;
        const absentCount = totalClasses - presentCount;

        const availableSubjects = Array.from(
            new Set([...assignedSubjects, ...rows.map((row) => row.subject)]),
        ).sort((a, b) => a.localeCompare(b));

        return res.status(200).json({
            success: true,
            filters: {
                subject,
                date,
                dateFrom,
                dateTo,
            },
            availableSubjects,
            summary: {
                totalClasses,
                presentCount,
                absentCount,
                attendanceRate: calculateRate(presentCount, totalClasses),
            },
            subjectSummary,
            records: rows,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch student attendance right now.",
            error: error.message,
        });
    }
};
