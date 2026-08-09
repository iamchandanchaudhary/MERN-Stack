/* eslint-disable react-hooks/set-state-in-effect */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  DEPARTMENT_LABEL_BY_VALUE,
  DEPARTMENT_OPTIONS,
  SUBJECT_LABEL_BY_VALUE,
  SUBJECT_OPTIONS,
} from "../data/academicOptions";

const INITIAL_FORM = {
  role: "teacher",
  name: "",
  identifier: "",
  password: "",
  departments: [],
  subjects: [],
};

const INITIAL_EDIT_FORM = {
  id: "",
  role: "teacher",
  name: "",
  identifier: "",
  password: "",
  departments: [],
  subjects: [],
};

const EMPTY_SUMMARY = {
  teachers: 0,
  students: 0,
  totalManaged: 0,
};

const IDENTIFIER_LABEL_BY_ROLE = {
  teacher: "Faculty ID",
  student: "Enrollment Number",
};

const formatOptionList = (values, labelMap) => {
  if (!Array.isArray(values) || values.length === 0) {
    return "Not assigned";
  }

  return values.map((value) => labelMap[value] || value).join(", ");
};

const AdminUserManagementPanel = () => {
  const { createManagedUser, deleteManagedUser, getManagedUsers, updateManagedUser } =
    useContext(AuthContext);

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [roleFilter, setRoleFilter] = useState("all");
  const [managedUsers, setManagedUsers] = useState([]);
  const [summary, setSummary] = useState(EMPTY_SUMMARY);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState("");
  const [editingUserId, setEditingUserId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editFormData, setEditFormData] = useState(INITIAL_EDIT_FORM);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userPendingDelete, setUserPendingDelete] = useState(null);
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);

  const fieldInputClassName =
    "w-full rounded-[10px] border border-[#d2dbea] bg-white px-3 py-2.5 font-body text-[0.95rem] focus:border-[var(--accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-75";

  const primaryButtonClassName =
    "rounded-xl border-0 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] px-4 py-[11px] font-body text-[0.94rem] font-bold text-white transition-transform duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-75 disabled:transform-none";

  const selectedIdentifierLabel = IDENTIFIER_LABEL_BY_ROLE[formData.role] || "Identifier";
  const editIdentifierLabel = IDENTIFIER_LABEL_BY_ROLE[editFormData.role] || "Identifier";

  const clearMessages = () => {
    if (errorMessage) {
      setErrorMessage("");
    }

    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const getRolePillClassName = (role) => {
    if (role === "teacher") {
      return "bg-[#fff0df] text-[#9a3f02]";
    }

    if (role === "student") {
      return "bg-[#e8f7ff] text-[#045b8e]";
    }

    return "bg-[#eef4ff] text-[#1f2f49]";
  };

  const toEditFormData = (user) => ({
    id: user.id,
    role: user.role,
    name: user.name || "",
    identifier: user.identifier || "",
    password: "",
    departments: Array.isArray(user.departments) ? [...user.departments] : [],
    subjects: Array.isArray(user.subjects) ? [...user.subjects] : [],
  });

  const loadUsers = async (nextRoleFilter = roleFilter) => {
    try {
      setIsLoadingUsers(true);
      setErrorMessage("");

      const roleQuery = nextRoleFilter === "all" ? "" : nextRoleFilter;
      const data = await getManagedUsers(roleQuery);

      setManagedUsers(data?.users || []);
      setSummary(data?.summary || EMPTY_SUMMARY);
    } catch (error) {
      const apiError = error?.response?.data?.message;
      setErrorMessage(apiError || "Unable to load managed users.");
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    loadUsers(roleFilter);
  }, [roleFilter]);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setFormData((previous) => {
      if (name === "role") {
        const nextRole = String(value).toLowerCase();
        const nextDepartments =
          nextRole === "student" ? previous.departments.slice(0, 1) : previous.departments;

        return {
          ...previous,
          role: nextRole,
          departments: nextDepartments,
        };
      }

      return {
        ...previous,
        [name]: value,
      };
    });

    clearMessages();
  };

  const handleTeacherDepartmentToggle = (departmentValue) => {
    setFormData((previous) => {
      const isSelected = previous.departments.includes(departmentValue);

      return {
        ...previous,
        departments: isSelected
          ? previous.departments.filter((value) => value !== departmentValue)
          : [...previous.departments, departmentValue],
      };
    });

    clearMessages();
  };

  const handleStudentDepartmentChange = (departmentValue) => {
    setFormData((previous) => ({
      ...previous,
      departments: departmentValue ? [departmentValue] : [],
    }));

    clearMessages();
  };

  const handleSubjectToggle = (subjectValue) => {
    setFormData((previous) => {
      const isSelected = previous.subjects.includes(subjectValue);

      return {
        ...previous,
        subjects: isSelected
          ? previous.subjects.filter((value) => value !== subjectValue)
          : [...previous.subjects, subjectValue],
      };
    });

    clearMessages();
  };

  const handleEditInputChange = ({ target }) => {
    const { name, value } = target;

    setEditFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    clearMessages();
  };

  const handleEditTeacherDepartmentToggle = (departmentValue) => {
    setEditFormData((previous) => {
      const isSelected = previous.departments.includes(departmentValue);

      return {
        ...previous,
        departments: isSelected
          ? previous.departments.filter((value) => value !== departmentValue)
          : [...previous.departments, departmentValue],
      };
    });

    clearMessages();
  };

  const handleEditStudentDepartmentChange = (departmentValue) => {
    setEditFormData((previous) => ({
      ...previous,
      departments: departmentValue ? [departmentValue] : [],
    }));

    clearMessages();
  };

  const handleEditSubjectToggle = (subjectValue) => {
    setEditFormData((previous) => {
      const isSelected = previous.subjects.includes(subjectValue);

      return {
        ...previous,
        subjects: isSelected
          ? previous.subjects.filter((value) => value !== subjectValue)
          : [...previous.subjects, subjectValue],
      };
    });

    clearMessages();
  };

  const getFormValidationMessage = (payload, options = {}) => {
    const isEditMode = options.isEditMode || false;

    if (!payload.role || !payload.name || !payload.identifier) {
      return "Please fill all required fields to continue.";
    }

    if (!isEditMode && !payload.password) {
      return "Please provide a password for the new account.";
    }

    if (payload.password && payload.password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    if (payload.role === "teacher" && payload.departments.length < 1) {
      return "Teacher must be assigned at least one department.";
    }

    if (payload.role === "student" && payload.departments.length !== 1) {
      return "Student must be assigned exactly one department.";
    }

    if (payload.subjects.length < 1) {
      return "Please assign at least one subject.";
    }

    return "";
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();

    const payload = {
      role: formData.role,
      name: formData.name.trim(),
      identifier: formData.identifier.trim(),
      password: formData.password,
      departments: formData.departments,
      subjects: formData.subjects,
    };

    const validationMessage = getFormValidationMessage(payload, { isEditMode: false });

    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const data = await createManagedUser(payload);
      setSuccessMessage(data?.message || "Account created successfully.");
      setFormData((previous) => ({
        ...previous,
        name: "",
        identifier: "",
        password: "",
        departments: [],
        subjects: [],
      }));
      setShowCreatePassword(false);
      await loadUsers(roleFilter);
    } catch (error) {
      const apiError = error?.response?.data?.message;
      setErrorMessage(apiError || "Unable to create account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (user) => {
    setEditFormData(toEditFormData(user));
    setIsEditModalOpen(true);
    clearMessages();
  };

  const closeEditModal = () => {
    if (editingUserId) {
      return;
    }

    setIsEditModalOpen(false);
    setEditFormData(INITIAL_EDIT_FORM);
    setShowEditPassword(false);
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();

    const payload = {
      role: editFormData.role,
      name: editFormData.name.trim(),
      identifier: editFormData.identifier.trim(),
      departments: editFormData.departments,
      subjects: editFormData.subjects,
      password: editFormData.password,
    };

    const validationMessage = getFormValidationMessage(payload, { isEditMode: true });

    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    const updatePayload = {
      name: payload.name,
      identifier: payload.identifier,
      departments: payload.departments,
      subjects: payload.subjects,
    };

    if (payload.password) {
      updatePayload.password = payload.password;
    }

    setEditingUserId(editFormData.id);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const data = await updateManagedUser(editFormData.id, updatePayload);
      setSuccessMessage(data?.message || "Account updated successfully.");
      setIsEditModalOpen(false);
      setEditFormData(INITIAL_EDIT_FORM);
      setShowEditPassword(false);
      await loadUsers(roleFilter);
    } catch (error) {
      const apiError = error?.response?.data?.message;
      setErrorMessage(apiError || "Unable to update account.");
    } finally {
      setEditingUserId("");
    }
  };

  const openDeleteModal = (user) => {
    setUserPendingDelete(user);
    clearMessages();
  };

  const closeDeleteModal = () => {
    if (deletingUserId) {
      return;
    }

    setUserPendingDelete(null);
  };

  const confirmDeleteUser = async () => {
    if (!userPendingDelete?.id) {
      return;
    }

    setDeletingUserId(userPendingDelete.id);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const data = await deleteManagedUser(userPendingDelete.id);
      setSuccessMessage(data?.message || "Account deleted successfully.");
      setUserPendingDelete(null);
      await loadUsers(roleFilter);
    } catch (error) {
      const apiError = error?.response?.data?.message;
      setErrorMessage(apiError || "Unable to delete account.");
    } finally {
      setDeletingUserId("");
    }
  };

  return (
    <>
      <section className="mt-[18px] rounded-2xl border border-[#dde8f7] bg-[linear-gradient(155deg,#ffffff,#f4f9ff)] p-[18px]">
        <div>
          <h3 className="font-heading">Admin User Management</h3>
          <p className="mt-2 text-[0.92rem] text-text-muted">
            Create, edit, and delete teacher and student accounts with academic assignments.
          </p>
        </div>

        <div className="mt-[14px] grid grid-cols-1 gap-2.5 min-[901px]:grid-cols-3">
          <article className="rounded-xl border border-[#e2ecfa] bg-white p-3">
            <p className="m-0 text-[0.84rem] text-text-muted">Total Teachers</p>
            <h4 className="mt-2 font-heading text-[1.25rem]">{summary.teachers}</h4>
          </article>
          <article className="rounded-xl border border-[#e2ecfa] bg-white p-3">
            <p className="m-0 text-[0.84rem] text-text-muted">Total Students</p>
            <h4 className="mt-2 font-heading text-[1.25rem]">{summary.students}</h4>
          </article>
          <article className="rounded-xl border border-[#e2ecfa] bg-white p-3">
            <p className="m-0 text-[0.84rem] text-text-muted">Total Managed Users</p>
            <h4 className="mt-2 font-heading text-[1.25rem]">{summary.totalManaged}</h4>
          </article>
        </div>

        <form
          className="mt-[14px] grid grid-cols-1 gap-2.5 min-[901px]:grid-cols-2"
          onSubmit={handleCreateUser}
        >
          <div className="grid gap-1.5">
            <label htmlFor="role" className="text-[0.88rem] font-bold">
              Role
            </label>
            <select
              id="role"
              name="role"
              className={fieldInputClassName}
              value={formData.role}
              onChange={handleInputChange}
              disabled={isSubmitting}
            >
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="name" className="text-[0.88rem] font-bold">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={fieldInputClassName}
              value={formData.name}
              onChange={handleInputChange}
              disabled={isSubmitting}
              placeholder="Enter full name"
            />
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="identifier" className="text-[0.88rem] font-bold">
              {selectedIdentifierLabel}
            </label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              className={fieldInputClassName}
              value={formData.identifier}
              onChange={handleInputChange}
              disabled={isSubmitting}
              placeholder={`Enter ${selectedIdentifierLabel.toLowerCase()}`}
            />
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="new-password" className="text-[0.88rem] font-bold">
              Password
            </label>
            <div className="relative">
              <input
                id="new-password"
                name="password"
                type={showCreatePassword ? "text" : "password"}
                className={`${fieldInputClassName} pr-12`}
                value={formData.password}
                onChange={handleInputChange}
                disabled={isSubmitting}
                placeholder="At least 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowCreatePassword((previous) => !previous)}
                disabled={isSubmitting}
                aria-label={showCreatePassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 border-0 bg-transparent p-0 text-[#5b6b82] transition-colors hover:text-[var(--accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  {showCreatePassword ? (
                    <>
                      <path d="M3 3l18 18" />
                      <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                      <path d="M9.9 5.1A10.9 10.9 0 0112 5c5.5 0 9.2 4.5 10 7-0.3 0.9-1.1 2.3-2.3 3.6" />
                      <path d="M6.2 6.2C4.1 7.5 2.7 9.7 2 12c0.8 2.5 4.5 7 10 7 2.3 0 4.2-0.8 5.7-1.9" />
                    </>
                  ) : (
                    <>
                      <path d="M2 12s3.7-7 10-7 10 7 10 7-3.7 7-10 7-10-7-10-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div className="col-span-full grid gap-1.5 rounded-xl border border-[#e2ebf8] bg-white p-3">
            <label className="text-[0.88rem] font-bold">Assign Departments</label>
            <p className="text-[0.82rem] text-text-muted">
              {formData.role === "teacher"
                ? "Teacher can be assigned to multiple departments."
                : "Student can be assigned to only one department."}
            </p>

            {formData.role === "teacher" ? (
              <div className="grid grid-cols-1 gap-2 min-[901px]:grid-cols-2">
                {DEPARTMENT_OPTIONS.map((department) => (
                  <label
                    key={department.value}
                    htmlFor={`create-department-${department.value}`}
                    className="flex items-center gap-2 rounded-lg border border-[#dbe6f6] px-3 py-2"
                  >
                    <input
                      id={`create-department-${department.value}`}
                      type="checkbox"
                      checked={formData.departments.includes(department.value)}
                      onChange={() => handleTeacherDepartmentToggle(department.value)}
                      disabled={isSubmitting}
                    />
                    <span className="text-[0.92rem]">{department.label}</span>
                  </label>
                ))}
              </div>
            ) : (
              <select
                id="student-department"
                className={fieldInputClassName}
                value={formData.departments[0] || ""}
                onChange={(event) => handleStudentDepartmentChange(event.target.value)}
                disabled={isSubmitting}
              >
                <option value="">Select one department</option>
                {DEPARTMENT_OPTIONS.map((department) => (
                  <option key={department.value} value={department.value}>
                    {department.label}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="col-span-full grid gap-1.5 rounded-xl border border-[#e2ebf8] bg-white p-3">
            <label className="text-[0.88rem] font-bold">Assign Subjects</label>
            <p className="text-[0.82rem] text-text-muted">
              Both teacher and student can be assigned multiple subjects.
            </p>
            <div className="grid grid-cols-1 gap-2 min-[901px]:grid-cols-2">
              {SUBJECT_OPTIONS.map((subject) => (
                <label
                  key={subject.value}
                  htmlFor={`create-subject-${subject.value}`}
                  className="flex items-center gap-2 rounded-lg border border-[#dbe6f6] px-3 py-2"
                >
                  <input
                    id={`create-subject-${subject.value}`}
                    type="checkbox"
                    checked={formData.subjects.includes(subject.value)}
                    onChange={() => handleSubjectToggle(subject.value)}
                    disabled={isSubmitting}
                  />
                  <span className="text-[0.92rem]">{subject.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="col-span-full mt-0.5 flex justify-start">
            <button type="submit" className={primaryButtonClassName} disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
          </div>
        </form>

        {(errorMessage || successMessage) && (
          <p
            className={
              errorMessage
                ? "mb-1 mt-0.5 text-[0.88rem] font-bold text-[#c02f2f]"
                : "my-2.5 text-[0.9rem] font-bold text-[#1e7f3f]"
            }
          >
            {errorMessage || successMessage}
          </p>
        )}

        <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
          <label htmlFor="filter-role" className="text-[0.88rem] font-bold">
            Filter Users
          </label>
          <div className="w-full min-[540px]:w-[220px]">
            <select
              id="filter-role"
              className={fieldInputClassName}
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              disabled={isLoadingUsers}
            >
              <option value="all">All</option>
              <option value="teacher">Teachers</option>
              <option value="student">Students</option>
            </select>
          </div>
        </div>

        {isLoadingUsers ? (
          <p className="mt-[10px] text-text-muted">Loading managed users...</p>
        ) : (
          <div className="mt-3 grid gap-2.5">
            {managedUsers.length === 0 ? (
              <p className="mt-[10px] text-text-muted">No users found for this filter.</p>
            ) : (
              managedUsers.map((user) => (
                <article key={user.id} className="rounded-xl border border-[#e2ebf8] bg-white p-3">
                  <div className="flex flex-col gap-2.5 min-[901px]:flex-row min-[901px]:items-start min-[901px]:justify-between">
                    <div>
                      <h4 className="font-heading text-[1rem]">{user.name}</h4>
                      <p className="mt-1 text-[0.9rem] text-text-muted">{user.identifier}</p>
                      <p className="mt-1 text-[0.86rem] text-[#344054]">
                        <strong>Departments:</strong>{" "}
                        {formatOptionList(user.departments, DEPARTMENT_LABEL_BY_VALUE)}
                      </p>
                      <p className="mt-1 text-[0.86rem] text-[#344054]">
                        <strong>Subjects:</strong>{" "}
                        {formatOptionList(user.subjects, SUBJECT_LABEL_BY_VALUE)}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <span
                        className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-[0.78rem] font-bold capitalize ${getRolePillClassName(
                          user.role,
                        )}`}
                      >
                        {user.role}
                      </span>
                      <button
                        type="button"
                        onClick={() => openEditModal(user)}
                        disabled={editingUserId === user.id || deletingUserId === user.id}
                        className="rounded-lg border border-[#c7ddf8] bg-[#f2f8ff] px-3 py-1.5 text-[0.82rem] font-bold text-[#1d4f91] transition-colors hover:bg-[#e5f1ff] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {editingUserId === user.id ? "Editing..." : "Edit"}
                      </button>
                      <button
                        type="button"
                        onClick={() => openDeleteModal(user)}
                        disabled={deletingUserId === user.id || editingUserId === user.id}
                        className="rounded-lg border border-[#f6c8c8] bg-[#fff2f2] px-3 py-1.5 text-[0.82rem] font-bold text-[#b42318] transition-colors hover:bg-[#ffe4e4] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deletingUserId === user.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        )}
      </section>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close edit modal"
            className="absolute inset-0 bg-[#0b1324]/55"
            onClick={closeEditModal}
          />
          <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#d8e5f8] bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-heading text-[1.2rem]">Edit {editFormData.role} Account</h4>
                <p className="mt-1 text-[0.9rem] text-text-muted">
                  Update user details and assignments. Leave password empty to keep current password.
                </p>
              </div>
              <button
                type="button"
                onClick={closeEditModal}
                disabled={Boolean(editingUserId)}
                className="rounded-lg border border-[#d5deeb] px-3 py-1.5 text-[0.83rem] font-bold text-[#42526b] hover:bg-[#f6f9ff] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Close
              </button>
            </div>

            <form className="mt-4 grid grid-cols-1 gap-2.5 min-[901px]:grid-cols-2" onSubmit={handleUpdateUser}>
              <div className="grid gap-1.5">
                <label className="text-[0.88rem] font-bold">Role</label>
                <input
                  type="text"
                  value={editFormData.role}
                  readOnly
                  className={`${fieldInputClassName} bg-[#f8fbff] capitalize`}
                />
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="edit-name" className="text-[0.88rem] font-bold">
                  Full Name
                </label>
                <input
                  id="edit-name"
                  name="name"
                  type="text"
                  className={fieldInputClassName}
                  value={editFormData.name}
                  onChange={handleEditInputChange}
                  disabled={Boolean(editingUserId)}
                  placeholder="Enter full name"
                />
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="edit-identifier" className="text-[0.88rem] font-bold">
                  {editIdentifierLabel}
                </label>
                <input
                  id="edit-identifier"
                  name="identifier"
                  type="text"
                  className={fieldInputClassName}
                  value={editFormData.identifier}
                  onChange={handleEditInputChange}
                  disabled={Boolean(editingUserId)}
                  placeholder={`Enter ${editIdentifierLabel.toLowerCase()}`}
                />
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="edit-password" className="text-[0.88rem] font-bold">
                  New Password (Optional)
                </label>
                <div className="relative">
                  <input
                    id="edit-password"
                    name="password"
                    type={showEditPassword ? "text" : "password"}
                    className={`${fieldInputClassName} pr-12`}
                    value={editFormData.password}
                    onChange={handleEditInputChange}
                    disabled={Boolean(editingUserId)}
                    placeholder="Leave blank to keep current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowEditPassword((previous) => !previous)}
                    disabled={Boolean(editingUserId)}
                    aria-label={showEditPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 border-0 bg-transparent p-0 text-[#5b6b82] transition-colors hover:text-[var(--accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      {showEditPassword ? (
                        <>
                          <path d="M3 3l18 18" />
                          <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                          <path d="M9.9 5.1A10.9 10.9 0 0112 5c5.5 0 9.2 4.5 10 7-0.3 0.9-1.1 2.3-2.3 3.6" />
                          <path d="M6.2 6.2C4.1 7.5 2.7 9.7 2 12c0.8 2.5 4.5 7 10 7 2.3 0 4.2-0.8 5.7-1.9" />
                        </>
                      ) : (
                        <>
                          <path d="M2 12s3.7-7 10-7 10 7 10 7-3.7 7-10 7-10-7-10-7z" />
                          <circle cx="12" cy="12" r="3" />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              <div className="col-span-full grid gap-1.5 rounded-xl border border-[#e2ebf8] bg-white p-3">
                <label className="text-[0.88rem] font-bold">Assign Departments</label>
                <p className="text-[0.82rem] text-text-muted">
                  {editFormData.role === "teacher"
                    ? "Teacher can be assigned to multiple departments."
                    : "Student can be assigned to only one department."}
                </p>

                {editFormData.role === "teacher" ? (
                  <div className="grid grid-cols-1 gap-2 min-[901px]:grid-cols-2">
                    {DEPARTMENT_OPTIONS.map((department) => (
                      <label
                        key={department.value}
                        htmlFor={`edit-department-${department.value}`}
                        className="flex items-center gap-2 rounded-lg border border-[#dbe6f6] px-3 py-2"
                      >
                        <input
                          id={`edit-department-${department.value}`}
                          type="checkbox"
                          checked={editFormData.departments.includes(department.value)}
                          onChange={() => handleEditTeacherDepartmentToggle(department.value)}
                          disabled={Boolean(editingUserId)}
                        />
                        <span className="text-[0.92rem]">{department.label}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <select
                    id="edit-student-department"
                    className={fieldInputClassName}
                    value={editFormData.departments[0] || ""}
                    onChange={(event) => handleEditStudentDepartmentChange(event.target.value)}
                    disabled={Boolean(editingUserId)}
                  >
                    <option value="">Select one department</option>
                    {DEPARTMENT_OPTIONS.map((department) => (
                      <option key={department.value} value={department.value}>
                        {department.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="col-span-full grid gap-1.5 rounded-xl border border-[#e2ebf8] bg-white p-3">
                <label className="text-[0.88rem] font-bold">Assign Subjects</label>
                <p className="text-[0.82rem] text-text-muted">
                  Both teacher and student can be assigned multiple subjects.
                </p>
                <div className="grid grid-cols-1 gap-2 min-[901px]:grid-cols-2">
                  {SUBJECT_OPTIONS.map((subject) => (
                    <label
                      key={subject.value}
                      htmlFor={`edit-subject-${subject.value}`}
                      className="flex items-center gap-2 rounded-lg border border-[#dbe6f6] px-3 py-2"
                    >
                      <input
                        id={`edit-subject-${subject.value}`}
                        type="checkbox"
                        checked={editFormData.subjects.includes(subject.value)}
                        onChange={() => handleEditSubjectToggle(subject.value)}
                        disabled={Boolean(editingUserId)}
                      />
                      <span className="text-[0.92rem]">{subject.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="col-span-full mt-1 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={Boolean(editingUserId)}
                  className="rounded-xl border border-[#d4ddec] px-4 py-[10px] text-[0.9rem] font-bold text-[#36475f] hover:bg-[#f3f7ff] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={Boolean(editingUserId)}
                  className={primaryButtonClassName}
                >
                  {editingUserId ? "Saving changes..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {userPendingDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[#0f172a]/55"
            onClick={closeDeleteModal}
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-[#f5cbcb] bg-white p-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-[#fff0f0] p-2.5 text-[#b42318]" aria-hidden="true">
                !
              </div>
              <div>
                <h4 className="font-heading text-[1.08rem] text-[#6f1d1b]">Delete Account</h4>
                <p className="mt-1 text-[0.9rem] text-[#7a2e2e]">
                  You are about to permanently delete the {userPendingDelete.role} account for{" "}
                  {userPendingDelete.name}. Select Delete to continue or Cancel to keep this account.
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={Boolean(deletingUserId)}
                className="rounded-xl border border-[#d4ddec] px-4 py-[10px] text-[0.9rem] font-bold text-[#36475f] hover:bg-[#f3f7ff] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteUser}
                disabled={Boolean(deletingUserId)}
                className="rounded-xl border-0 bg-[#d92d20] px-4 py-[10px] text-[0.9rem] font-bold text-white hover:bg-[#bf241a] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingUserId ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUserManagementPanel;
