export const ROLE_CONFIG = {
  student: {
    title: "Student",
    shortCode: "STU",
    description: "Track daily attendance, subjects, and leave requests from one place.",
    accentPrimary: "#0ea5e9",
    accentSecondary: "#22d3ee",
    identifierLabel: "Enrollment Number",
  },
  teacher: {
    title: "Teacher",
    shortCode: "TCH",
    description: "Mark class attendance, review trends, and manage student attendance alerts.",
    accentPrimary: "#f97316",
    accentSecondary: "#fb923c",
    identifierLabel: "Faculty ID",
  },
  admin: {
    title: "Admin",
    shortCode: "ADM",
    description: "Monitor institute-wide attendance, manage users, and track compliance reports.",
    accentPrimary: "#16a34a",
    accentSecondary: "#4ade80",
    identifierLabel: "Admin Email",
  },
};

export const getRoleConfig = (roleKey = "") => ROLE_CONFIG[roleKey.toLowerCase()] || null;
