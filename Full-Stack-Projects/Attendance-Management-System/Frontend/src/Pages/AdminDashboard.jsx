import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import PortalLayout from "../Components/PortalLayout";
import StatsGrid from "../Components/StatsGrid";
import DashboardCardList from "../Components/DashboardCardList";
import AdminUserManagementPanel from "../Components/AdminUserManagementPanel";
import { AuthContext } from "../context/AuthContext";
import { getRoleConfig } from "../data/roleConfig";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { authSession, isAuthLoading, logout, getManagedUsers } = useContext(AuthContext);

  const normalizedRoleKey = "admin";
  const role = getRoleConfig(normalizedRoleKey);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [adminSummary, setAdminSummary] = useState(null);

  // Admin-specific data (hardcoded)
  const adminActions = [
    "Manage student accounts",
    "Approve leave and holiday rules",
    "Export compliance reports",
  ];

  const adminUpdates = [
    "Monthly attendance audit starts tomorrow",
    "3 new faculty accounts require approval",
    "System backup completed at 02:15 AM",
  ];

  // Fetch admin dashboard summary
  useEffect(() => {
    let isActive = true;

    const loadAdminSummary = async () => {
      try {
        const data = await getManagedUsers();
        if (isActive) {
          setAdminSummary(data?.summary || null);
        }
      } catch {
        if (isActive) {
          setAdminSummary(null);
        }
      }
    };

    loadAdminSummary();
    return () => {
      isActive = false;
    };
  }, [getManagedUsers]);

  // Use real data if available, fallback to demo data
  const adminStats = adminSummary
    ? [
        { label: "Total Students", value: String(adminSummary.students ?? 0) },
        { label: "Total Teachers", value: String(adminSummary.teachers ?? 0) },
        { label: "Total Managed Users", value: String(adminSummary.totalManaged ?? 0) },
      ]
    : [
        { label: "Total Students", value: "1,248" },
        { label: "Total Teachers", value: "84" },
        { label: "Institute Attendance", value: "88%" },
      ];

  const actionButtonBaseClassName =
    "rounded-xl border-0 px-4 py-[11px] font-body text-[0.94rem] font-bold transition-transform duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-75 disabled:transform-none";

  if (!role || normalizedRoleKey !== "admin") {
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

  if (!authSession.identifier || authSession.role !== "admin") {
    return <Navigate to="/login/admin" replace />;
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
            <h2 className="font-heading text-[1.5rem]">Admin Dashboard</h2>
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

        {/* <div className="grid grid-cols-1 gap-[14px] min-[901px]:grid-cols-2">
          <DashboardCardList title="Quick Actions" items={adminActions} />
          <DashboardCardList title="Today Updates" items={adminUpdates} />
        </div> */}

        <AdminUserManagementPanel />
      </section>
    </PortalLayout>
  );
};

export default AdminDashboard;
