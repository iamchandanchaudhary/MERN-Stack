import { useContext, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import PortalLayout from "../Components/PortalLayout";
import StatsGrid from "../Components/StatsGrid";
import { AuthContext } from "../context/AuthContext";
import {
  DEPARTMENT_LABEL_BY_VALUE,
  SUBJECT_LABEL_BY_VALUE,
} from "../data/academicOptions";
import { getRoleConfig } from "../data/roleConfig";

const getLabel = (value, labelMap) => {
  return labelMap[value] || value;
};

const formatDate = (value) => {
  if (!value) {
    return "-";
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString();
};

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { authSession, isAuthLoading, logout, getStudentAttendance } = useContext(AuthContext);

  const normalizedRoleKey = "student";
  const role = getRoleConfig(normalizedRoleKey);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState(null);
  const [subjectSummary, setSubjectSummary] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [isAttendanceLoading, setIsAttendanceLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [subjectFilter, setSubjectFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");

  const actionButtonBaseClassName =
    "rounded-xl border-0 px-4 py-[11px] font-body text-[0.94rem] font-bold transition-transform duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-75 disabled:transform-none";

  const loadAttendance = async (filters = {}) => {
    setIsAttendanceLoading(true);
    setErrorMessage("");

    try {
      const response = await getStudentAttendance(filters);

      setSummary(response?.summary || null);
      setSubjectSummary(response?.subjectSummary || []);
      setRecords(response?.records || []);
      setAvailableSubjects(response?.availableSubjects || []);
    } catch (error) {
      setSummary(null);
      setSubjectSummary([]);
      setRecords([]);
      setErrorMessage(
        error?.response?.data?.message || "Unable to load your attendance right now.",
      );
    } finally {
      setIsAttendanceLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadInitialAttendance = async () => {
      try {
        const response = await getStudentAttendance();

        if (!isMounted) {
          return;
        }

        setSummary(response?.summary || null);
        setSubjectSummary(response?.subjectSummary || []);
        setRecords(response?.records || []);
        setAvailableSubjects(response?.availableSubjects || []);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setSummary(null);
        setSubjectSummary([]);
        setRecords([]);
        setErrorMessage(
          error?.response?.data?.message || "Unable to load your attendance right now.",
        );
      } finally {
        if (isMounted) {
          setIsAttendanceLoading(false);
        }
      }
    };

    loadInitialAttendance();

    return () => {
      isMounted = false;
    };
  }, [getStudentAttendance]);

  const studentStats = useMemo(() => {
    return [
      { label: "Total Classes", value: String(summary?.totalClasses ?? 0) },
      { label: "Present", value: String(summary?.presentCount ?? 0) },
      { label: "Overall Attendance", value: `${summary?.attendanceRate ?? 0}%` },
    ];
  }, [summary]);

  const handleApplyFilters = async () => {
    const payload = {
      subject: subjectFilter,
      date: dateFilter,
      dateFrom: dateFilter ? "" : dateFromFilter,
      dateTo: dateFilter ? "" : dateToFilter,
    };

    await loadAttendance(payload);
  };

  const handleResetFilters = async () => {
    setSubjectFilter("");
    setDateFilter("");
    setDateFromFilter("");
    setDateToFilter("");
    await loadAttendance();
  };

  if (!role || normalizedRoleKey !== "student") {
    return <Navigate to="/" replace />;
  }

  if (isAuthLoading || isAttendanceLoading) {
    return (
      <PortalLayout activeRole={role}>
        <section className="animate-fadeInUpFast">
          <p className="mt-[10px] text-text-muted">Loading student attendance...</p>
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

  if (!authSession.identifier || authSession.role !== "student") {
    return <Navigate to="/login/student" replace />;
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
            <h2 className="font-heading text-[1.5rem]">Student Dashboard</h2>
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

        <StatsGrid stats={studentStats} />

        <article className="mt-4 rounded-2xl border border-[#e8eef8] bg-[linear-gradient(155deg,#ffffff,#f8fbff)] p-[18px]">
          <h3 className="font-heading text-[1.1rem]">Filter Attendance</h3>
          <p className="mt-1 text-[0.92rem] text-text-muted">
            Filter by subject and date. You can pick one exact date or a date range.
          </p>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <label className="text-[0.86rem] font-semibold text-[#0f172a]">
              Subject
              <select
                value={subjectFilter}
                onChange={(event) => setSubjectFilter(event.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#dbe6f6] bg-white px-3 py-2 text-[0.95rem] text-[#1e293b] outline-none transition-shadow focus-visible:shadow-[0_0_0_3px_rgba(14,165,233,0.25)]"
              >
                <option value="">All subjects</option>
                {availableSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {getLabel(subject, SUBJECT_LABEL_BY_VALUE)}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-[0.86rem] font-semibold text-[#0f172a]">
              Exact Date
              <input
                type="date"
                value={dateFilter}
                onChange={(event) => setDateFilter(event.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#dbe6f6] bg-white px-3 py-2 text-[0.95rem] text-[#1e293b] outline-none transition-shadow focus-visible:shadow-[0_0_0_3px_rgba(14,165,233,0.25)]"
              />
            </label>

            <label className="text-[0.86rem] font-semibold text-[#0f172a]">
              From Date
              <input
                type="date"
                value={dateFromFilter}
                onChange={(event) => setDateFromFilter(event.target.value)}
                disabled={Boolean(dateFilter)}
                className="mt-1.5 w-full rounded-xl border border-[#dbe6f6] bg-white px-3 py-2 text-[0.95rem] text-[#1e293b] outline-none transition-shadow focus-visible:shadow-[0_0_0_3px_rgba(14,165,233,0.25)] disabled:cursor-not-allowed disabled:bg-[#f8fafc]"
              />
            </label>

            <label className="text-[0.86rem] font-semibold text-[#0f172a]">
              To Date
              <input
                type="date"
                value={dateToFilter}
                onChange={(event) => setDateToFilter(event.target.value)}
                disabled={Boolean(dateFilter)}
                className="mt-1.5 w-full rounded-xl border border-[#dbe6f6] bg-white px-3 py-2 text-[0.95rem] text-[#1e293b] outline-none transition-shadow focus-visible:shadow-[0_0_0_3px_rgba(14,165,233,0.25)] disabled:cursor-not-allowed disabled:bg-[#f8fafc]"
              />
            </label>

            <div className="flex items-end gap-2">
              <button
                type="button"
                onClick={handleApplyFilters}
                className="w-full rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] px-4 py-[11px] font-body text-[0.94rem] font-bold text-white transition-transform duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-full rounded-xl border border-[#dbe6f6] bg-white px-4 py-[11px] font-body text-[0.94rem] font-bold text-[#1f2f49] transition-transform duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2"
              >
                Reset
              </button>
            </div>
          </div>

          {errorMessage && (
            <p className="mt-3 rounded-xl border border-[#fecaca] bg-[#fff1f2] px-3 py-2 text-[0.9rem] text-[#9f1239]">
              {errorMessage}
            </p>
          )}
        </article>

        <article className="mt-4 rounded-2xl border border-[#e6edf8] bg-white p-4 shadow-[0_10px_20px_rgba(15,23,42,0.05)]">
          <h3 className="font-heading text-[1.1rem]">Subject-wise Attendance</h3>
          {subjectSummary.length === 0 ? (
            <p className="mt-3 text-text-muted">No attendance found for selected filters.</p>
          ) : (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#e2e8f0] text-[0.82rem] uppercase tracking-[0.04em] text-[#64748b]">
                    <th className="px-2 py-2.5">Subject</th>
                    <th className="px-2 py-2.5">Total Classes</th>
                    <th className="px-2 py-2.5">Present</th>
                    <th className="px-2 py-2.5">Absent</th>
                    <th className="px-2 py-2.5">Attendance %</th>
                  </tr>
                </thead>
                <tbody>
                  {subjectSummary.map((item) => (
                    <tr key={item.subject} className="border-b border-[#f1f5f9]">
                      <td className="px-2 py-2.5 text-[0.95rem] text-[#0f172a]">
                        {getLabel(item.subject, SUBJECT_LABEL_BY_VALUE)}
                      </td>
                      <td className="px-2 py-2.5 text-[0.91rem] text-[#475569]">
                        {item.totalClasses}
                      </td>
                      <td className="px-2 py-2.5 text-[0.91rem] text-[#166534]">
                        {item.presentCount}
                      </td>
                      <td className="px-2 py-2.5 text-[0.91rem] text-[#991b1b]">
                        {item.absentCount}
                      </td>
                      <td className="px-2 py-2.5 text-[0.91rem] text-[#0f172a]">
                        {item.attendanceRate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>

        <article className="mt-4 rounded-2xl border border-[#e6edf8] bg-white p-4 shadow-[0_10px_20px_rgba(15,23,42,0.05)]">
          <h3 className="font-heading text-[1.1rem]">Full Attendance Table</h3>
          {records.length === 0 ? (
            <p className="mt-3 text-text-muted">No attendance records found.</p>
          ) : (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#e2e8f0] text-[0.82rem] uppercase tracking-[0.04em] text-[#64748b]">
                    <th className="px-2 py-2.5">Date</th>
                    <th className="px-2 py-2.5">Department</th>
                    <th className="px-2 py-2.5">Subject</th>
                    <th className="px-2 py-2.5">Status</th>
                    <th className="px-2 py-2.5">Marked By</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record.id} className="border-b border-[#f1f5f9]">
                      <td className="px-2 py-2.5 text-[0.91rem] text-[#475569]">
                        {formatDate(record.date)}
                      </td>
                      <td className="px-2 py-2.5 text-[0.91rem] text-[#475569]">
                        {getLabel(record.department, DEPARTMENT_LABEL_BY_VALUE)}
                      </td>
                      <td className="px-2 py-2.5 text-[0.95rem] text-[#0f172a]">
                        {getLabel(record.subject, SUBJECT_LABEL_BY_VALUE)}
                      </td>
                      <td className="px-2 py-2.5">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[0.78rem] font-semibold ${
                            record.status === "present"
                              ? "bg-[#dcfce7] text-[#166534]"
                              : "bg-[#fee2e2] text-[#991b1b]"
                          }`}
                        >
                          {record.status === "present" ? "Present" : "Absent"}
                        </span>
                      </td>
                      <td className="px-2 py-2.5 text-[0.91rem] text-[#475569]">
                        {record.teacherName || record.teacherIdentifier || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>
      </section>
    </PortalLayout>
  );
};

export default StudentDashboard;
