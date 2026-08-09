import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import { AuthContext } from "../context/AuthContext";

const RegisteredUsers = () => {
    const { backendUrl } = useContext(AuthContext);
    const baseUrl = useMemo(() => (
        backendUrl.endsWith("/") ? backendUrl.slice(0, -1) : backendUrl
    ), [backendUrl]);

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [listError, setListError] = useState("");
    const [actionError, setActionError] = useState("");
    const [deletingId, setDeletingId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        address: "",
        password: ""
    });
    const [formError, setFormError] = useState("");
    const [formSuccess, setFormSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        let isActive = true;

        const loadUsers = async () => {
            setIsLoading(true);
            setListError("");

            try {
                const response = await fetch(`${baseUrl}/api/admin/users`);
                const data = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(data.message || "Unable to load users.");
                }

                if (isActive) {
                    setUsers(Array.isArray(data.users) ? data.users : []);
                }
            } catch (error) {
                if (isActive) {
                    setListError(error.message || "Unable to load users.");
                }
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        };

        loadUsers();

        return () => {
            isActive = false;
        };
    }, [baseUrl]);

    const formatDate = (value) => {
        if (!value) {
            return "";
        }

        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) {
            return "";
        }

        return parsed.toLocaleDateString();
    };

    const filteredUsers = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return users;
        }

        return users.filter((user) => {
            const fields = [
                user?.name,
                user?.email,
                user?.address,
                user?.id ? String(user.id) : ""
            ]
                .filter(Boolean)
                .map((value) => String(value).toLowerCase());

            return fields.some((value) => value.includes(query));
        });
    }, [users, searchQuery]);

    const userCountLabel = searchQuery.trim()
        ? `${filteredUsers.length} of ${users.length} users`
        : `${users.length} registered user${users.length === 1 ? "" : "s"}`;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormValues({
            name: "",
            email: "",
            address: "",
            password: ""
        });
    };

    const handleCreateUser = async (event) => {
        event.preventDefault();

        if (isSubmitting) {
            return;
        }

        const payload = {
            name: formValues.name.trim(),
            email: formValues.email.trim().toLowerCase(),
            address: formValues.address.trim(),
            password: formValues.password
        };

        setFormError("");
        setFormSuccess("");

        if (!payload.name || !payload.email || !payload.address || !payload.password) {
            setFormError("All fields are required to create a user.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`${baseUrl}/api/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || "Unable to create user.");
            }

            const createdUser = data.user || {
                name: payload.name,
                email: payload.email,
                address: payload.address,
                role: "user"
            };

            setUsers((prev) => [
                {
                    ...createdUser,
                    createdAt: createdUser.createdAt || new Date().toISOString()
                },
                ...prev
            ]);
            setFormSuccess("User created successfully.");
            resetForm();
        } catch (error) {
            setFormError(error.message || "Unable to create user.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (userId) => {
        if (!userId || deletingId) {
            return;
        }

        const confirmed = window.confirm("Delete this user? This action cannot be undone.");
        if (!confirmed) {
            return;
        }

        setActionError("");
        setDeletingId(userId);

        try {
            const response = await fetch(`${baseUrl}/api/admin/users/${userId}`, {
                method: "DELETE"
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || "Unable to delete user.");
            }

            setUsers((prev) => prev.filter((user) => user.id !== userId));
        } catch (error) {
            setActionError(error.message || "Unable to delete user.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#dbeafe,_transparent_65%)]" />
            <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-blue-200/60 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/3 translate-y-1/4 rounded-full bg-sky-200/60 blur-3xl" />

            <AdminNavbar />

            <main className="relative z-10 mx-auto w-full max-w-6xl px-6 py-10">
                <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-500">
                            Registered users
                        </p>
                        <h1 className="text-3xl font-semibold text-slate-900">User directory</h1>
                        <p className="text-sm text-slate-600">
                            See every user profile that has registered on RateStore.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <label className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                placeholder="Search users"
                                className="w-56 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                            />
                        </label>
                        <button
                            type="button"
                            onClick={() => setShowCreateForm((prev) => !prev)}
                            className="cursor-pointer rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-600 shadow-sm transition hover:border-blue-300"
                        >
                            {showCreateForm ? "Cancle" : "Create new user"}
                        </button>
                        <span className="rounded-full text-xs text-slate-700 border border-slate-200/70 bg-white/80 px-4 py-2 shadow-sm">
                            <span className="font-semibold">{userCountLabel}</span>
                        </span>
                        <Link
                            to="/admin"
                            className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
                        >
                            Back to admin
                        </Link>
                    </div>
                </header>

                {showCreateForm && (
                    <section className="mt-8 rounded-xl border border-slate-200/70 bg-white/90 p-6 shadow-xl backdrop-blur">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">Create new user</h2>
                                <p className="text-sm text-slate-500">Add a user account directly from the admin panel.</p>
                            </div>
                        </div>

                        <form onSubmit={handleCreateUser} className="mt-6 grid gap-4 md:grid-cols-2">
                            <label className="block text-sm font-semibold text-slate-700">
                                Full name
                                <input
                                    type="text"
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter name"
                                    autoComplete="name"
                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                                    required
                                />
                            </label>

                            <label className="block text-sm font-semibold text-slate-700">
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter email"
                                    autoComplete="email"
                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                                    required
                                />
                            </label>

                            <label className="block text-sm font-semibold text-slate-700">
                                Address
                                <input
                                    type="text"
                                    name="address"
                                    value={formValues.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter address"
                                    autoComplete="street-address"
                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                                    required
                                />
                            </label>

                            <label className="block text-sm font-semibold text-slate-700">
                                Temporary password
                                <input
                                    type="password"
                                    name="password"
                                    value={formValues.password}
                                    onChange={handleInputChange}
                                    placeholder="Set a password"
                                    autoComplete="new-password"
                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                                    required
                                />
                            </label>

                            <div className="md:col-span-2 flex flex-wrap items-center gap-3">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="rounded-xl bg-linear-to-br from-[#0141cb] to-[#00a9fd] cursor-pointer px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {isSubmitting ? "Creating user..." : "Create user"}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="cursor-pointer rounded-xl border border-slate-200 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
                                >
                                    Clear
                                </button>
                            </div>
                        </form>

                        {formError && (
                            <p className="mt-4 text-sm text-red-600">{formError}</p>
                        )}
                        {formSuccess && (
                            <p className="mt-4 text-sm text-emerald-600">{formSuccess}</p>
                        )}
                    </section>
                )}

                <section className="mt-8 rounded-xl border border-slate-200/70 bg-white/80 p-6 shadow-xl backdrop-blur">
                    {isLoading && (
                        <div className="space-y-3 text-sm text-slate-500">Loading users...</div>
                    )}

                    {!isLoading && listError && (
                        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-4 text-sm text-red-700">
                            {listError}
                        </div>
                    )}

                    {!isLoading && !listError && actionError && (
                        <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-4 text-sm text-red-700">
                            {actionError}
                        </div>
                    )}

                    {!isLoading && !listError && users.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                            No registered users yet.
                        </div>
                    )}

                    {!isLoading && !listError && users.length > 0 && filteredUsers.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                            No users match your search.
                        </div>
                    )}

                    {!isLoading && !listError && filteredUsers.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-separate border-spacing-y-3 text-left text-sm">
                                <thead>
                                    <tr className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                        <th className="px-4">User</th>
                                        <th className="px-4">Email</th>
                                        <th className="px-4">Address</th>
                                        <th className="px-4">Joined</th>
                                        <th className="px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="bg-white/90 shadow-sm">
                                            <td className="rounded-l-2xl px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-linear-to-br from-[#0141cb] to-[#00a9fd] text-sm font-semibold text-white">
                                                        {(user.name || "U").charAt(0)}
                                                    </span>
                                                    <div>
                                                        <p className="font-semibold text-slate-900">{user.name || "Unknown"}</p>
                                                        <p className="text-xs text-slate-500">ID: {user.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-slate-600">{user.email || "Not available"}</td>
                                            <td className="px-4 py-4 text-slate-600">{user.address || "Not available"}</td>
                                            <td className="px-4 py-4 text-slate-600">
                                                {formatDate(user.createdAt) || "Not available"}
                                            </td>
                                            <td className="rounded-r-2xl px-4 py-4 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(user.id)}
                                                    disabled={deletingId === user.id}
                                                    className="cursor-pointer rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:border-red-300 disabled:cursor-not-allowed disabled:opacity-70"
                                                >
                                                    {deletingId === user.id ? "Deleting..." : "Delete"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default RegisteredUsers;
