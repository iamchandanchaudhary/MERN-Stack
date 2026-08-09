import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminDashboard = () => {
    const { backendUrl, token, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageError, setPageError] = useState("");
    const [detailsError, setDetailsError] = useState("");
    const [deleteError, setDeleteError] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isDetailsLoading, setIsDetailsLoading] = useState(false);
    const [deletingUserId, setDeletingUserId] = useState(null);

    const baseUrl = backendUrl.endsWith("/") ? backendUrl.slice(0, -1) : backendUrl;

    const totalUsers = useMemo(() => users.length, [users]);

    const formatDate = (value) => {
        if (!value) {
            return "Not available";
        }

        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
            return value;
        }

        return new Intl.DateTimeFormat(undefined, {
            dateStyle: "medium",
            timeStyle: "short"
        }).format(date);
    };

    const fetchUsers = async () => {
        setIsLoading(true);
        setPageError("");

        try {
            const response = await fetch(`${baseUrl}/api/admin/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || "Unable to load users.");
            }

            setUsers(data.users || []);
        } catch (error) {
            setPageError(error.message || "Unable to load users.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/login/admin", { replace: true });
            return;
        }

        fetchUsers();
    }, [baseUrl, navigate, token]);

    const handleLogout = () => {
        logout();
        navigate("/login/admin", { replace: true });
    };

    const handleViewDetails = async (userId) => {
        setIsDetailsLoading(true);
        setDetailsError("");

        try {
            const response = await fetch(`${baseUrl}/api/admin/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || "Unable to load user details.");
            }

            setSelectedUser(data.user || null);
            setIsDetailsOpen(true);
        } catch (error) {
            setDetailsError(error.message || "Unable to load user details.");
            setIsDetailsOpen(true);
        } finally {
            setIsDetailsLoading(false);
        }
    };

    const closeDetails = () => {
        setIsDetailsOpen(false);
        setSelectedUser(null);
        setDetailsError("");
    };

    const handleDeleteUser = async (userId) => {
        const confirmed = window.confirm("Delete this user and all tasks?");

        if (!confirmed) {
            return;
        }

        setDeletingUserId(userId);
        setDeleteError("");

        try {
            const response = await fetch(`${baseUrl}/api/admin/users/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || "Unable to delete user.");
            }

            setUsers((current) => current.filter((item) => item._id !== userId));
            if (selectedUser && selectedUser._id === userId) {
                closeDetails();
            }
        } catch (error) {
            setDeleteError(error.message || "Unable to delete user.");
        } finally {
            setDeletingUserId(null);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
            <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(circle at top, #e2e8f0, transparent 62%)" }}
            />
            <div className="absolute -top-16 right-0 h-64 w-64 rounded-full bg-blue-200/60 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/3 translate-y-1/4 rounded-full bg-sky-200/60 blur-3xl" />

            <main className="relative z-10 mx-auto w-full max-w-6xl px-6 py-12">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                            Admin Control Room
                        </p>
                        <h1 className="text-3xl font-semibold text-slate-900">User Management</h1>
                        <p className="mt-2 text-sm text-slate-600">
                            Welcome {user?.email || "Admin"}. Total users: {totalUsers}.
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-slate-800"
                    >
                        Logout
                    </button>
                </div>

                {pageError && (
                    <div className="mt-6 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {pageError}
                    </div>
                )}

                {deleteError && (
                    <div className="mt-4 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {deleteError}
                    </div>
                )}

                <section className="mt-8 grid gap-4 md:grid-cols-2">
                    {isLoading ? (
                        <div className="rounded-xl border border-slate-200 bg-white px-6 py-10 text-sm text-slate-500 shadow">
                            Loading users...
                        </div>
                    ) : users.length === 0 ? (
                        <div className="rounded-xl border border-slate-200 bg-white px-6 py-10 text-sm text-slate-500 shadow">
                            No registered users found.
                        </div>
                    ) : (
                        users.map((item) => (
                            <article
                                key={item._id}
                                className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white px-6 py-5 shadow"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-900">
                                            {item.name || "Unnamed user"}
                                        </h2>
                                        <p className="text-sm text-slate-500">{item.email}</p>
                                        <p className="mt-1 text-xs text-slate-400">
                                            Registered: {formatDate(item.createdAt)}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2 text-right text-xs text-slate-500">
                                        <span className="w-max rounded-full bg-slate-100 px-3 py-1">
                                            Tasks: {item.taskStats?.total || 0}
                                        </span>
                                        <span className="w-max rounded-full bg-amber-50 px-3 py-1 text-amber-700">
                                            Pending: {item.taskStats?.pending || 0}
                                        </span>
                                        <span className="w-max rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                                            Completed: {item.taskStats?.completed || 0}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => handleViewDetails(item._id)}
                                        className="cursor-pointer rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                                    >
                                        View Details
                                    </button>
                                    {/* <button
                                        onClick={() => handleDeleteUser(item._id)}
                                        disabled={deletingUserId === item._id}
                                        className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {deletingUserId === item._id ? "Deleting..." : "Delete"}
                                    </button> */}
                                </div>
                            </article>
                        ))
                    )}
                </section>
            </main>

            {isDetailsOpen && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 px-6">
                    <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">User Details</p>
                                <h3 className="text-2xl font-semibold text-slate-900">
                                    {selectedUser?.name || "User"}
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">{selectedUser?.email}</p>
                            </div>
                            <button
                                onClick={closeDetails}
                                className="cursor-pointer rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50"
                                aria-label="Close details"
                            >
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                                    <path d="M6.4 5.3L12 10.9l5.6-5.6 1.1 1.1-5.6 5.6 5.6 5.6-1.1 1.1-5.6-5.6-5.6 5.6-1.1-1.1 5.6-5.6-5.6-5.6z" />
                                </svg>
                            </button>
                        </div>

                        {isDetailsLoading ? (
                            <p className="mt-6 text-sm text-slate-500">Loading details...</p>
                        ) : detailsError ? (
                            <p className="mt-6 text-sm text-red-600">{detailsError}</p>
                        ) : (
                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                <div className="space-y-3 text-sm text-slate-600">
                                    <p>
                                        <span className="font-semibold text-slate-800">Address:</span> {selectedUser?.address || "Not provided"}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-slate-800">Joined:</span> {formatDate(selectedUser?.createdAt)}
                                    </p>
                                    <p>
                                        <span className="font-semibold text-slate-800">Last updated:</span> {formatDate(selectedUser?.updatedAt)}
                                    </p>
                                </div>
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm font-semibold text-slate-800">Task Summary</p>
                                    <div className="mt-3 space-y-2 text-sm text-slate-600">
                                        <p>Total tasks: {selectedUser?.taskStats?.total || 0}</p>
                                        <p>Pending tasks: {selectedUser?.taskStats?.pending || 0}</p>
                                        <p>Completed tasks: {selectedUser?.taskStats?.completed || 0}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-6 flex flex-wrap gap-3">
                            {selectedUser && (
                                <button
                                    onClick={() => handleDeleteUser(selectedUser._id)}
                                    disabled={deletingUserId === selectedUser._id}
                                    className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {deletingUserId === selectedUser._id ? "Deleting..." : "Delete User"}
                                </button>
                            )}
                            <button
                                onClick={closeDetails}
                                className="cursor-pointer rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;