import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const emptyForm = {
    taskName: "",
    description: "",
    taskDate: "",
    taskTime: ""
};

const statusStyles = {
    pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    "in-progress": "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
    completed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
};

const UserDashboard = () => {
    const { backendUrl, token, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [pageError, setPageError] = useState("");
    const [formError, setFormError] = useState("");
    const [detailTask, setDetailTask] = useState(null);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [statusFilter, setStatusFilter] = useState("all");
    const [timeFilter, setTimeFilter] = useState("latest");

    const baseUrl = backendUrl.endsWith("/") ? backendUrl.slice(0, -1) : backendUrl;

    const isEditing = Boolean(editingTaskId);

    const stats = useMemo(() => {
        const total = tasks.length;
        const pending = tasks.filter((task) => task.status === "pending").length;
        const completed = tasks.filter((task) => task.status === "completed").length;

        return { total, pending, completed };
    }, [tasks]);

    const getTaskScheduleValue = (task) => {
        const scheduleValue = new Date(`${task.taskDate}T${task.taskTime}`).getTime();

        return Number.isNaN(scheduleValue) ? 0 : scheduleValue;
    };

    const visibleTasks = useMemo(() => {
        const filteredTasks = tasks.filter((task) => {
            if (statusFilter === "all") {
                return true;
            }

            return task.status === statusFilter;
        });

        return [...filteredTasks].sort((leftTask, rightTask) => {
            const leftSchedule = getTaskScheduleValue(leftTask);
            const rightSchedule = getTaskScheduleValue(rightTask);

            return timeFilter === "oldest" ? leftSchedule - rightSchedule : rightSchedule - leftSchedule;
        });
    }, [statusFilter, tasks, timeFilter]);

    const formatTaskDateTime = (taskDate, taskTime) => {
        if (!taskDate || !taskTime) {
            return "Not scheduled";
        }

        const date = new Date(`${taskDate}T${taskTime}`);

        if (Number.isNaN(date.getTime())) {
            return `${taskDate} at ${taskTime}`;
        }

        return new Intl.DateTimeFormat(undefined, {
            dateStyle: "medium",
            timeStyle: "short"
        }).format(date);
    };

    const closeFormModal = () => {
        setIsFormOpen(false);
        setFormError("");
        setEditingTaskId(null);
        setForm(emptyForm);
    };

    const openCreateModal = () => {
        setForm(emptyForm);
        setEditingTaskId(null);
        setFormError("");
        setIsFormOpen(true);
    };

    const openEditModal = (task) => {
        setEditingTaskId(task._id);
        setForm({
            taskName: task.taskName || "",
            description: task.description || "",
            taskDate: task.taskDate || "",
            taskTime: task.taskTime || ""
        });
        setFormError("");
        setIsFormOpen(true);
    };

    const openDetails = (task) => {
        setDetailTask(task);
        setIsDetailsOpen(true);
    };

    useEffect(() => {
        if (!token) {
            navigate("/login/user", { replace: true });
            return;
        }

        const loadTasks = async () => {
            setIsLoading(true);
            setPageError("");

            try {
                const response = await fetch(`${baseUrl}/api/tasks/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(data.message || "Unable to load tasks.");
                }

                setTasks(data.tasks || []);
            } catch (error) {
                setPageError(error.message || "Unable to load tasks.");
            } finally {
                setIsLoading(false);
            }
        };

        loadTasks();
    }, [baseUrl, navigate, token]);

    const handleLogout = () => {
        logout();
        navigate("/login/user", { replace: true });
    };

    const syncTaskInState = (updatedTask) => {
        setTasks((currentTasks) =>
            currentTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
        );
        setDetailTask((currentTask) =>
            currentTask && currentTask._id === updatedTask._id ? updatedTask : currentTask
        );
    };

    const handleCreateOrUpdateTask = async (event) => {
        event.preventDefault();

        if (isSubmitting) {
            return;
        }

        setFormError("");
        setIsSubmitting(true);

        try {
            const response = await fetch(`${baseUrl}/api/tasks${isEditing ? `/${editingTaskId}` : ""}`, {
                method: isEditing ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || (isEditing ? "Unable to update task." : "Unable to create task."));
            }

            if (isEditing) {
                syncTaskInState(data.task);
            } else {
                setTasks((currentTasks) => [data.task, ...currentTasks]);
            }

            closeFormModal();
        } catch (error) {
            setFormError(error.message || (isEditing ? "Unable to update task." : "Unable to create task."));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteTask = async (taskId) => {
        const confirmed = window.confirm("Delete this task permanently?");

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/api/tasks/${taskId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || "Unable to delete task.");
            }

            setTasks((currentTasks) => currentTasks.filter((task) => task._id !== taskId));
            setDetailTask((currentTask) => (currentTask && currentTask._id === taskId ? null : currentTask));
        } catch (error) {
            setPageError(error.message || "Unable to delete task.");
        }
    };

    const handleMarkComplete = async (taskId) => {
        try {
            const response = await fetch(`${baseUrl}/api/tasks/${taskId}/status`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || "Unable to update task status.");
            }

            syncTaskInState(data.task);
        } catch (error) {
            setPageError(error.message || "Unable to update task status.");
        }
    };

    return (
        <div
            className="min-h-screen text-slate-900"
            style={{ background: "radial-gradient(circle at top, #dbeafe 0%, #f8fafc 48%, #e2e8f0 100%)" }}
        >
            <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-linear-to-b from-sky-100/80 to-transparent" />

            <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-10">
                <section className="overflow-hidden rounded-xl border border-white/60 bg-white/75 p-6 shadow-md backdrop-blur-xl lg:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-700 ring-1 ring-sky-200">
                                Task Dashboard
                            </div>
                            <div>
                                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                                    Welcome back, {user?.name || "User"}
                                </h1>
                                <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
                                    Track your work, edit deadlines, complete tasks, and keep everything organized in one place.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={openCreateModal}
                                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800"
                            >
                                <span className="text-base leading-none">+</span>
                                Create Task
                            </button>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="cursor-pointer inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-3">
                    {[
                        { label: "Total Tasks", value: stats.total, accent: "from-sky-500 to-cyan-400" },
                        { label: "Pending", value: stats.pending, accent: "from-amber-500 to-orange-400" },
                        { label: "Completed", value: stats.completed, accent: "from-emerald-500 to-teal-400" }
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="relative overflow-hidden rounded-lg border border-white/60 bg-white/80 p-5 shadow-md shadow-slate-900/5 backdrop-blur"
                        >
                            <div className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${item.accent}`} />
                            <p className="text-sm font-medium text-slate-500">{item.label}</p>
                            <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">{item.value}</p>
                        </div>
                    ))}
                </section>

                {pageError && (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                        {pageError}
                    </div>
                )}

                <section className="overflow-hidden rounded-xl border border-white/60 bg-white/80 p-4 shadow-md shadow-slate-900/5 backdrop-blur">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">Filter Tasks</h2>
                            <p className="text-sm text-slate-500">Filter by status and sort by task timing.</p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 lg:min-w-105">
                            <label className="block text-sm font-semibold text-slate-700">
                                Status
                                <select
                                    value={statusFilter}
                                    onChange={(event) => setStatusFilter(event.target.value)}
                                    className="cursor-pointer mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                                >
                                    <option value="all">All Tasks</option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </label>

                            <label className="block text-sm font-semibold text-slate-700">
                                Schedule Order
                                <select
                                    value={timeFilter}
                                    onChange={(event) => setTimeFilter(event.target.value)}
                                    className="cursor-pointer mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                                >
                                    <option value="latest">Latest Task</option>
                                    <option value="oldest">Oldest Task</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </section>

                <section className="overflow-hidden rounded-xl border border-white/60 bg-white/80 shadow-md backdrop-blur-xl">
                    <div className="border-b border-slate-200/80 px-6 py-5">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">Your Tasks</h2>
                                <p className="text-sm text-slate-500">A quick view of everything you have scheduled.</p>
                            </div>
                            <button
                                type="button"
                                onClick={openCreateModal}
                                className="cursor-pointer inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-200 transition hover:bg-sky-500"
                            >
                                New Task
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        {isLoading ? (
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="h-44 animate-pulse rounded-lg bg-slate-100" />
                                ))}
                            </div>
                        ) : visibleTasks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-2xl text-sky-700">
                                    ✓
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">No tasks yet</h3>
                                <p className="mt-2 max-w-md text-sm text-slate-500">
                                    Create your first task to start organizing your day.
                                </p>
                                <button
                                    type="button"
                                    onClick={openCreateModal}
                                    className="cursor-pointer mt-6 inline-flex items-center rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                                >
                                    Create Task
                                </button>
                            </div>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {visibleTasks.map((task) => (
                                    <article
                                        key={task._id}
                                        className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Task</p>
                                                <h3 className="mt-2 text-lg font-semibold text-slate-900">{task.taskName}</h3>
                                            </div>
                                            <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[task.status] || statusStyles.pending}`}>
                                                {task.status}
                                            </span>
                                        </div>

                                        <p
                                            className="mt-4 text-sm leading-6 text-slate-600"
                                            style={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden"
                                            }}
                                        >
                                            {task.description}
                                        </p>

                                        <div className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="font-medium text-slate-500">Date</span>
                                                <span className="font-semibold text-slate-900">{task.taskDate}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="font-medium text-slate-500">Time</span>
                                                <span className="font-semibold text-slate-900">{task.taskTime}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="font-medium text-slate-500">Scheduled</span>
                                                <span className="text-right font-semibold text-slate-900">{formatTaskDateTime(task.taskDate, task.taskTime)}</span>
                                            </div>
                                        </div>

                                        <div className="mt-5 flex justify-between">
                                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                                <button
                                                    type="button"
                                                    onClick={() => openDetails(task)}
                                                    className="cursor-pointer w-max rounded-lg border border-slate-200 bg-white p-2 text-xs font-semibold transition hover:border-slate-300 hover:text-slate-900"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-slate-700" viewBox="0 -960 960 960"><path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z" /></svg>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => openEditModal(task)}
                                                    className="cursor-pointer w-max rounded-lg border border-sky-200 bg-sky-50 p-2 text-xs font-semibold transition hover:bg-sky-100"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-sky-700" viewBox="0 0 640 640"><path d="M535.6 85.7C513.7 63.8 478.3 63.8 456.4 85.7L432 110.1L529.9 208L554.3 183.6C576.2 161.7 576.2 126.3 554.3 104.4L535.6 85.7zM236.4 305.7C230.3 311.8 225.6 319.3 222.9 327.6L193.3 416.4C190.4 425 192.7 434.5 199.1 441C205.5 447.5 215 449.7 223.7 446.8L312.5 417.2C320.7 414.5 328.2 409.8 334.4 403.7L496 241.9L398.1 144L236.4 305.7zM160 128C107 128 64 171 64 224L64 480C64 533 107 576 160 576L416 576C469 576 512 533 512 480L512 384C512 366.3 497.7 352 480 352C462.3 352 448 366.3 448 384L448 480C448 497.7 433.7 512 416 512L160 512C142.3 512 128 497.7 128 480L128 224C128 206.3 142.3 192 160 192L256 192C273.7 192 288 177.7 288 160C288 142.3 273.7 128 256 128L160 128z" /></svg>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteTask(task._id)}
                                                    className="cursor-pointer w-max rounded-lg border border-rose-200 bg-rose-50 p-2 text-xs font-semibold transition hover:bg-rose-100"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-rose-700" viewBox="0 -960 960 960"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                                                </button>
                                            </div>

                                            <div>
                                                {task.status !== "completed" ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleMarkComplete(task._id)}
                                                        className="cursor-pointer w-max rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                                                    >
                                                        Mark Complete
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleMarkComplete(task._id)}
                                                        className="cursor-pointer rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
                                                    >
                                                        Mark Pending
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-8">
                    <div className="w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-[0_30px_120px_rgba(15,23,42,0.28)]">
                        <div className="border-b border-slate-200 px-6 py-5">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900">{isEditing ? "Edit Task" : "Create Task"}</h3>
                                    <p className="text-sm text-slate-500">
                                        {isEditing ? "Update the task details below." : "Add a new task with deadline details."}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={closeFormModal}
                                    className="cursor-pointer rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
                                >
                                    Close
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleCreateOrUpdateTask} className="space-y-4 px-6 py-6">
                            <label className="block text-sm font-semibold text-slate-700">
                                Task Name
                                <input
                                    type="text"
                                    value={form.taskName}
                                    onChange={(event) => setForm((current) => ({ ...current, taskName: event.target.value }))}
                                    placeholder="Enter task name"
                                    required
                                    className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                                />
                            </label>

                            <label className="block text-sm font-semibold text-slate-700">
                                Description
                                <textarea
                                    value={form.description}
                                    onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                                    placeholder="Describe the task"
                                    rows="4"
                                    required
                                    className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                                />
                            </label>

                            <div className="grid gap-4 md:grid-cols-2">
                                <label className="block text-sm font-semibold text-slate-700">
                                    Set Date
                                    <input
                                        type="date"
                                        value={form.taskDate}
                                        onChange={(event) => setForm((current) => ({ ...current, taskDate: event.target.value }))}
                                        required
                                        className="cursor-pointer mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                                    />
                                </label>

                                <label className="block text-sm font-semibold text-slate-700">
                                    Set Time
                                    <input
                                        type="time"
                                        value={form.taskTime}
                                        onChange={(event) => setForm((current) => ({ ...current, taskTime: event.target.value }))}
                                        required
                                        className="cursor-pointer mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                                    />
                                </label>
                            </div>

                            {formError && (
                                <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{formError}</p>
                            )}

                            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={closeFormModal}
                                    className="cursor-pointer rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="cursor-pointer rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isSubmitting ? (isEditing ? "Updating..." : "Creating...") : isEditing ? "Update Task" : "Create Task"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isDetailsOpen && detailTask && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-8">
                    <div className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-[0_30px_120px_rgba(15,23,42,0.28)]">
                        <div className="border-b border-slate-200 px-6 py-5">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Task Details</p>
                                    <h3 className="mt-2 text-2xl font-semibold text-slate-900">{detailTask.taskName}</h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsDetailsOpen(false)}
                                    className="cursor-pointer rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
                                >
                                    Close
                                </button>
                            </div>
                        </div>

                        <div className="space-y-5 px-6 py-2">
                            <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                                <span className="text-sm font-medium text-slate-500">Status</span>
                                <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[detailTask.status] || statusStyles.pending}`}>
                                    {detailTask.status}
                                </span>
                            </div>

                            <div className="rounded-lg border border-slate-200 bg-white p-4">
                                <p className="text-sm font-semibold text-slate-500">Description</p>
                                <p className="mt-2 text-sm leading-6 text-slate-700">{detailTask.description}</p>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm font-semibold text-slate-500">Date</p>
                                    <p className="mt-2 text-base font-semibold text-slate-900">{detailTask.taskDate}</p>
                                </div>
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm font-semibold text-slate-500">Time</p>
                                    <p className="mt-2 text-base font-semibold text-slate-900">{detailTask.taskTime}</p>
                                </div>
                            </div>

                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <p className="text-sm font-semibold text-slate-500">Scheduled</p>
                                <p className="mt-2 text-base font-semibold text-slate-900">{formatTaskDateTime(detailTask.taskDate, detailTask.taskTime)}</p>
                            </div>

                            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsDetailsOpen(false)}
                                    className="cursor-pointer rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsDetailsOpen(false);
                                        openEditModal(detailTask);
                                    }}
                                    className="cursor-pointer rounded-lg bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-sky-200 transition hover:bg-sky-500"
                                >
                                    Edit Task
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;