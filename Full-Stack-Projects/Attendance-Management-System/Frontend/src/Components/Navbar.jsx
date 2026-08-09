import { Link, useLocation } from "react-router-dom";

const getNavItems = (activeRole) => {
  if (activeRole?.title) {
    const roleKey = activeRole.title.toLowerCase();
    const items = [
      {
        label: "Home",
        to: "/",
      },
      {
        label: `${activeRole.title} Dashboard`,
        to: `/dashboard/${roleKey}`,
      },
    ];

    if (roleKey === "teacher") {
      items.push({
        label: "Make Attendance",
        to: "/dashboard/teacher/attendance",
      });
    }

    return items;
  }

  return [
    { label: "Home", to: "/" },
    { label: "Student Login", to: "/login/student" },
    { label: "Teacher Login", to: "/login/teacher" },
    { label: "Admin Login", to: "/login/admin" },
  ];
};

const Navbar = ({ activeRole }) => {
  const location = useLocation();
  const navItems = getNavItems(activeRole);

  return (
    <header className="mb-6 rounded-2xl border border-[#d9e5f7] bg-[linear-gradient(160deg,rgba(255,255,255,0.95),rgba(241,248,255,0.92))] p-4 shadow-[0_12px_28px_rgba(15,23,42,0.08)] sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div>
            <p className="m-0 text-[0.72rem] font-extrabold uppercase tracking-[0.08em] text-text-muted">
              Attendance Management System
            </p>
            <h1 className="m-0 font-heading text-[clamp(1.28rem,2.3vw,1.82rem)] leading-tight text-[#0f172a]">
              Role Based Portal
            </h1>
          </div>
        </div>

        {activeRole && (
          <span className="inline-flex w-fit items-center rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] px-[14px] py-2 text-[0.8rem] font-bold text-white shadow-[0_10px_18px_rgba(15,23,42,0.14)]">
            {activeRole.title} Mode
          </span>
        )}
      </div>

      <nav className="mt-4 flex flex-wrap gap-2" aria-label="Primary">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`rounded-full px-3 py-1.5 text-[0.84rem] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 ${isActive
                  ? "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white"
                  : "bg-[#edf4ff] text-[#1f3658] hover:bg-[#dceaff]"
                }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Navbar;