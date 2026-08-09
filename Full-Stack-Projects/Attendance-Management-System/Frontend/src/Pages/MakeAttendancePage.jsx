import { useContext, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import PortalLayout from "../Components/PortalLayout";
import { AuthContext } from "../context/AuthContext";
import {
  DEPARTMENT_LABEL_BY_VALUE,
  SUBJECT_LABEL_BY_VALUE,
} from "../data/academicOptions";
import { getRoleConfig } from "../data/roleConfig";

const formatLabel = (value, labelMap) => {
  return labelMap[value] || value;
};

const MakeAttendancePage = () => {
  const { roleKey } = useParams();
  const navigate = useNavigate();
  const normalizedRoleKey = useMemo(() => roleKey?.toLowerCase() || "", [roleKey]);
  const role = getRoleConfig(normalizedRoleKey);

  const {
    authSession,
    isAuthLoading,
    getTeacherAttendanceMeta,
    getStudentsForAttendance,
    submitTeacherAttendance,
  } = useContext(AuthContext);

  const [departments, setDepartments] = useState([]);
  const [departmentSubjectMap, setDepartmentSubjectMap] = useState({});
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().slice(0, 10));
  const [students, setStudents] = useState([]);
  const [attendanceByStudent, setAttendanceByStudent] = useState({});
  const [isMetaLoading, setIsMetaLoading] = useState(true);
  const [isStudentsLoading, setIsStudentsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const subjectOptions = useMemo(() => {
    return departmentSubjectMap[selectedDepartment] || [];
  }, [departmentSubjectMap, selectedDepartment]);

  useEffect(() => {
    let isMounted = true;

    const loadMeta = async () => {
      if (normalizedRoleKey !== "teacher") {
        setIsMetaLoading(false);
        return;
      }

      try {
        const response = await getTeacherAttendanceMeta();

        if (!isMounted) {
          return;
        }

        const nextDepartments = response?.options?.departments || [];
        const nextDepartmentSubjectMap = response?.options?.departmentSubjectMap || {};

        setDepartments(nextDepartments);
        setDepartmentSubjectMap(nextDepartmentSubjectMap);

        const defaultDepartment = nextDepartments[0] || "";
        const defaultSubject =
          (nextDepartmentSubjectMap[defaultDepartment] || [])[0] || "";

        setSelectedDepartment(defaultDepartment);
        setSelectedSubject(defaultSubject);
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error?.response?.data?.message ||
              "Unable to load attendance options right now.",
          );
        }
      } finally {
        if (isMounted) {
          setIsMetaLoading(false);
        }
      }
    };

    loadMeta();

    return () => {
      isMounted = false;
    };
  }, [getTeacherAttendanceMeta, normalizedRoleKey]);

  useEffect(() => {
    const nextSubjectOptions = departmentSubjectMap[selectedDepartment] || [];

    if (!nextSubjectOptions.includes(selectedSubject)) {
      setSelectedSubject(nextSubjectOptions[0] || "");
    }
  }, [departmentSubjectMap, selectedDepartment, selectedSubject]);

  const handleLoadStudents = async () => {
    if (!selectedDepartment || !selectedSubject) {
      setErrorMessage("Please select both department and subject.");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setIsStudentsLoading(true);

    try {
      const response = await getStudentsForAttendance({
        department: selectedDepartment,
        subject: selectedSubject,
      });

      const nextStudents = response?.students || [];
      const defaultAttendanceMap = nextStudents.reduce((accumulator, student) => {
        accumulator[student.id] = "present";
        return accumulator;
      }, {});

      setStudents(nextStudents);
      setAttendanceByStudent(defaultAttendanceMap);
    } catch (error) {
      setStudents([]);
      setAttendanceByStudent({});
      setErrorMessage(
        error?.response?.data?.message || "Unable to load students for attendance.",
      );
    } finally {
      setIsStudentsLoading(false);
    }
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceByStudent((previous) => ({
      ...previous,
      [studentId]: status,
    }));
  };

  const handleSubmitAttendance = async () => {
    if (!selectedDepartment || !selectedSubject) {
      setErrorMessage("Please select department and subject.");
      return;
    }

    if (students.length === 0) {
      setErrorMessage("No students available to mark attendance.");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const records = students.map((student) => ({
        studentId: student.id,
        status: attendanceByStudent[student.id] || "present",
      }));

      const response = await submitTeacherAttendance({
        department: selectedDepartment,
        subject: selectedSubject,
        date: attendanceDate,
        records,
      });

      setSuccessMessage(response?.message || "Attendance submitted successfully.");
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Unable to submit attendance right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!role) {
    return <Navigate to="/" replace />;
  }

  if (isAuthLoading || isMetaLoading) {
    return (
      <PortalLayout activeRole={role}>
        <section className="animate-fadeInUpFast">
          <p className="mt-[10px] text-text-muted">Loading attendance workspace...</p>
        </section>
      </PortalLayout>
    );
  }

  if (!authSession.identifier || authSession.role !== "teacher") {
    return <Navigate to="/login/teacher" replace />;
  }

  return (
    <PortalLayout activeRole={role}>
      <section className="animate-fadeInUpFast">
        <div className="mb-[18px] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-[1.5rem]">Make Attendance</h2>
            <p className="mt-[8px] text-text-muted">
              Select department and subject to load matching students, then submit attendance.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate(`/dashboard/${normalizedRoleKey}`)}
            className="rounded-xl bg-[#eef4ff] px-4 py-[11px] font-body text-[0.94rem] font-bold text-[#1f2f49] transition-transform duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2"
          >
            Back to Dashboard
          </button>
        </div>

        <article className="rounded-2xl border border-[#e8eef8] bg-[linear-gradient(155deg,#ffffff,#f8fbff)] p-[18px]">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-[0.86rem] font-semibold text-[#0f172a]">
              Select Department
              <select
                value={selectedDepartment}
                onChange={(event) => setSelectedDepartment(event.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#dbe6f6] bg-white px-3 py-2 text-[0.95rem] text-[#1e293b] outline-none transition-shadow focus-visible:shadow-[0_0_0_3px_rgba(249,115,22,0.25)]"
              >
                <option value="">Choose department</option>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {formatLabel(department, DEPARTMENT_LABEL_BY_VALUE)}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-[0.86rem] font-semibold text-[#0f172a]">
              Select Subject
              <select
                value={selectedSubject}
                onChange={(event) => setSelectedSubject(event.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#dbe6f6] bg-white px-3 py-2 text-[0.95rem] text-[#1e293b] outline-none transition-shadow focus-visible:shadow-[0_0_0_3px_rgba(249,115,22,0.25)]"
              >
                <option value="">Choose subject</option>
                {subjectOptions.map((subject) => (
                  <option key={subject} value={subject}>
                    {formatLabel(subject, SUBJECT_LABEL_BY_VALUE)}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-[0.86rem] font-semibold text-[#0f172a]">
              Attendance Date
              <input
                type="date"
                value={attendanceDate}
                onChange={(event) => setAttendanceDate(event.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#dbe6f6] bg-white px-3 py-2 text-[0.95rem] text-[#1e293b] outline-none transition-shadow focus-visible:shadow-[0_0_0_3px_rgba(249,115,22,0.25)]"
              />
            </label>

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleLoadStudents}
                disabled={isStudentsLoading}
                className="w-full rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] px-4 py-[11px] font-body text-[0.94rem] font-bold text-white transition-transform duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:transform-none"
              >
                {isStudentsLoading ? "Loading..." : "Load Students"}
              </button>
            </div>
          </div>

          {errorMessage && (
            <p className="mt-3 rounded-xl border border-[#fecaca] bg-[#fff1f2] px-3 py-2 text-[0.9rem] text-[#9f1239]">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="mt-3 rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] px-3 py-2 text-[0.9rem] text-[#166534]">
              {successMessage}
            </p>
          )}
        </article>

        <article className="mt-4 rounded-2xl border border-[#e6edf8] bg-white p-4 shadow-[0_10px_20px_rgba(15,23,42,0.05)]">
          <h3 className="font-heading text-[1.1rem]">Student Attendance List</h3>
          {students.length === 0 ? (
            <p className="mt-3 text-text-muted">
              Load students using department and subject to start marking attendance.
            </p>
          ) : (
            <>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#e2e8f0] text-[0.82rem] uppercase tracking-[0.04em] text-[#64748b]">
                      <th className="px-2 py-2.5">Name</th>
                      <th className="px-2 py-2.5">Enrollment</th>
                      <th className="px-2 py-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b border-[#f1f5f9]">
                        <td className="px-2 py-2.5 text-[0.95rem] text-[#0f172a]">{student.name}</td>
                        <td className="px-2 py-2.5 text-[0.91rem] text-[#475569]">
                          {student.identifier}
                        </td>
                        <td className="px-2 py-2.5">
                          <div className="flex items-center gap-3">
                            <label className="inline-flex items-center gap-2 text-[0.92rem] text-[#0f172a]">
                              <input
                                type="radio"
                                name={`attendance-${student.id}`}
                                checked={attendanceByStudent[student.id] === "present"}
                                onChange={() => handleAttendanceChange(student.id, "present")}
                              />
                              Present
                            </label>
                            <label className="inline-flex items-center gap-2 text-[0.92rem] text-[#0f172a]">
                              <input
                                type="radio"
                                name={`attendance-${student.id}`}
                                checked={attendanceByStudent[student.id] === "absent"}
                                onChange={() => handleAttendanceChange(student.id, "absent")}
                              />
                              Absent
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleSubmitAttendance}
                  disabled={isSubmitting}
                  className="rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] px-5 py-[11px] font-body text-[0.94rem] font-bold text-white shadow-[0_10px_20px_rgba(249,115,22,0.25)] transition-transform duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:transform-none"
                >
                  {isSubmitting ? "Submitting..." : "Submit Attendance"}
                </button>
              </div>
            </>
          )}
        </article>
      </section>
    </PortalLayout>
  );
};

export default MakeAttendancePage;
