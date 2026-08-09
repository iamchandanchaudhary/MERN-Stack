import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import PortalLayout from "../Components/PortalLayout";
import StatsGrid from "../Components/StatsGrid";
import DashboardCardList from "../Components/DashboardCardList";
import { AuthContext } from "../context/AuthContext";
import { getRoleConfig } from "../data/roleConfig";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { authSession, isAuthLoading, logout, getTeacherDashboardSummary } =
    useContext(AuthContext);

  const normalizedRoleKey = "teacher";
  const role = getRoleConfig(normalizedRoleKey);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [teacherSummary, setTeacherSummary] = useState(null);

  // Teacher-specific data (hardcoded)
  const teacherActions = [
    "Make attendance",
    "Review absentee list",
    "Send attendance alerts",
  ];

  const teacherUpdates = [
    "Semester B attendance summary ready",
    "2 classes pending attendance entry",
    "Meeting with admin at 3:00 PM",
  ];

  // Fetch teacher dashboard summary
  useEffect(() => {
    let isActive = true;

    const loadTeacherSummary = async () => {
      try {
        const data = await getTeacherDashboardSummary();
        if (isActive) {
          setTeacherSummary(data?.summary || null);
        }
      } catch {
        if (isActive) {
          setTeacherSummary(null);
        }
      }
    };

    loadTeacherSummary();
    return () => {
      isActive = false;
    };
  }, [getTeacherDashboardSummary]);

  // Use real data if available, fallback to demo data
  const teacherStats = teacherSummary
    ? [
        { label: "Classes Assigned", value: String(teacherSummary.classesAssigned ?? 0) },
        {
          label: "Attendance Marked Today",
          value: String(teacherSummary.attendanceMarkedToday ?? 0),
        },
        { label: "Subjects Assigned", value: String(teacherSummary.subjectsAssigned ?? 0) },
      ]
    : [
        { label: "Classes Assigned", value: "8" },
        { label: "Attendance Marked Today", value: "4" },
        { label: "Subjects Assigned", value: "6" },
      ];

  const actionButtonBaseClassName =
    "rounded-xl border-0 px-4 py-[11px] font-body text-[0.94rem] font-bold transition-transform duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-75 disabled:transform-none";

  if (!role || normalizedRoleKey !== "teacher") {
    return <Navigate to="/" replace />;
  }

  if (isAuthLoading) {
    return (
      <PortalLayout activeRole={role}>
        <section className="animate-fadeInUpFast">
          <p className="mt-[10px] text-text-muted">Checking active session...</p>
        </section>
      </PortalLayout>
    );
  }

  if (isLoggingOut) {
    return (
      <PortalLayout activeRole={role}>
        <section className="animate-fadeInUpFast">
          <p className="mt-[10px] text-text-muted">Logging out...</p>
        </section>
      </PortalLayout>
    );
  }

  if (!authSession.identifier || authSession.role !== "teacher") {
    return <Navigate to="/login/teacher" replace />;
  }

  const switchRole = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
    navigate("/");
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
    navigate("/");
  };

  return (
    <PortalLayout activeRole={role}>
      <section className="animate-fadeInUpFast">
        <div className="mb-[18px] flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
          <div>
            <h2 className="font-heading text-[1.5rem]">Teacher Dashboard</h2>
            <p className="mt-[10px] text-text-muted">
              Logged in as <strong>{authSession.name || authSession.identifier}</strong>
            </p>
          </div>

          <div className="mt-2 flex flex-wrap gap-2.5">
            <button
              type="button"
              className={`${actionButtonBaseClassName} bg-[#eef4ff] text-[#1f2f49]`}
              onClick={switchRole}
              disabled={isLoggingOut}
            >
              Switch Role
            </button>
            <button
              type="button"
              className={`${actionButtonBaseClassName} bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white`}
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>

        <StatsGrid stats={teacherStats} />

        <div className="mb-4">
          <button
            type="button"
            className={`${actionButtonBaseClassName} bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white`}
            onClick={() => navigate("/dashboard/teacher/attendance")}
          >
            Make Attendance
          </button>
        </div>

        <div className="grid grid-cols-1 gap-[14px] min-[901px]:grid-cols-2">
          <DashboardCardList title="Quick Actions" items={teacherActions} />
          <DashboardCardList title="Today Updates" items={teacherUpdates} />
        </div>
      </section>
    </PortalLayout>
  );
};

export default TeacherDashboard;
