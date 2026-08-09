import { useContext, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminUserManagementPanel from "../Components/AdminUserManagementPanel";
import DashboardCardList from "../Components/DashboardCardList";
import PortalLayout from "../Components/PortalLayout";
import StatsGrid from "../Components/StatsGrid";
import { AuthContext } from "../context/AuthContext";
import { getRoleConfig } from "../data/roleConfig";

const DashboardPage = () => {
  const { roleKey } = useParams();
  const navigate = useNavigate();
  const { authSession, isAuthLoading, logout, getManagedUsers, getTeacherDashboardSummary } =
    useContext(AuthContext);

  const normalizedRoleKey = useMemo(() => roleKey?.toLowerCase() || "", [roleKey]);
  const role = getRoleConfig(normalizedRoleKey);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [adminSummary, setAdminSummary] = useState(null);
  const [teacherSummary, setTeacherSummary] = useState(null);

  useEffect(() => {
    let isActive = true;

    const loadDashboardSummaries = async () => {
      if (normalizedRoleKey === "admin") {
        try {
          const data = await getManagedUsers();

          if (isActive) {
            setAdminSummary(data?.summary || null);
            setTeacherSummary(null);
          }
        } catch {
          if (isActive) {
            setAdminSummary(null);
            setTeacherSummary(null);
          }
        }
        return;
      }

      if (normalizedRoleKey === "teacher") {
        try {
          const data = await getTeacherDashboardSummary();

          if (isActive) {
            setTeacherSummary(data?.summary || null);
            setAdminSummary(null);
          }
        } catch {
          if (isActive) {
            setTeacherSummary(null);
            setAdminSummary(null);
          }
        }
        return;
      }

      if (isActive) {
        setAdminSummary(null);
        setTeacherSummary(null);
      }
    };

    loadDashboardSummaries();

    return () => {
      isActive = false;
    };
  }, [getManagedUsers, getTeacherDashboardSummary, normalizedRoleKey]);

  const dashboardStats =
    normalizedRoleKey === "admin" && adminSummary
      ? [
          { label: "Total Students", value: String(adminSummary.students ?? 0) },
          { label: "Total Teachers", value: String(adminSummary.teachers ?? 0) },
          { label: "Total Managed Users", value: String(adminSummary.totalManaged ?? 0) },
        ]
      : normalizedRoleKey === "teacher" && teacherSummary
      ? [
          { label: "Classes Assigned", value: String(teacherSummary.classesAssigned ?? 0) },
          {
            label: "Attendance Marked Today",
            value: String(teacherSummary.attendanceMarkedToday ?? 0),
          },
          { label: "Subjects Assigned", value: String(teacherSummary.subjectsAssigned ?? 0) },
        ]
      : role.dashboard.stats;

  const actionButtonBaseClassName =
    "rounded-xl border-0 px-4 py-[11px] font-body text-[0.94rem] font-bold transition-transform duration-150 ease-in-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-75 disabled:transform-none";

  if (!role) {
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

  if (!authSession.identifier || authSession.role !== normalizedRoleKey) {
    return <Navigate to={`/login/${normalizedRoleKey}`} replace />;
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
            <h2 className="font-heading text-[1.5rem]">{role.title} Dashboard</h2>
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
              className={`${actionButtonBaseClassName} bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white shadow-[0_10px_20px_rgba(14,165,233,0.25)]`}
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>

        <StatsGrid stats={dashboardStats} />

        {normalizedRoleKey === "teacher" && (
          <div className="mb-4">
            <button
              type="button"
              className={`${actionButtonBaseClassName} bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white shadow-[0_10px_20px_rgba(249,115,22,0.25)]`}
              onClick={() => navigate(`/dashboard/${normalizedRoleKey}/attendance`)}
            >
              Make Attendance
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-[14px] min-[901px]:grid-cols-2">
          <DashboardCardList title="Quick Actions" items={role.dashboard.actions} />
          <DashboardCardList title="Today Updates" items={role.dashboard.updates} />
        </div>

        {normalizedRoleKey === "admin" && <AdminUserManagementPanel />}
      </section>
    </PortalLayout>
  );
};

export default DashboardPage;
