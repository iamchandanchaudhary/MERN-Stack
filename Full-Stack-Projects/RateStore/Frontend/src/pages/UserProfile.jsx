import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
    const { backendUrl, user, login } = useContext(AuthContext);
    const baseUrl = useMemo(() => (
        backendUrl.endsWith("/") ? backendUrl.slice(0, -1) : backendUrl
    ), [backendUrl]);

    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        address: ""
    });
    const [profileSnapshot, setProfileSnapshot] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isPasswordEditing, setIsPasswordEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [formError, setFormError] = useState("");
    const [formSuccess, setFormSuccess] = useState("");
    const [passwordValues, setPasswordValues] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [isPasswordSaving, setIsPasswordSaving] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");

    useEffect(() => {
        let isActive = true;

        const loadProfile = async () => {
            if (!user?.id) {
                setFormError("Please sign in again to view your profile.");
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setFormError("");
            setFormSuccess("");

            try {
                const response = await fetch(`${baseUrl}/api/users/${user.id}`);
                const data = await response.json().catch(() => ({}));

                if (!response.ok) {
                    throw new Error(data.message || "Unable to load profile.");
                }

                if (isActive) {
                    const payload = data.user || {};
                    setProfileSnapshot(payload);
                    setFormValues({
                        name: payload.name || "",
                        email: payload.email || "",
                        address: payload.address || ""
                    });
                    setIsEditing(false);
                }
            } catch (error) {
                if (isActive) {
                    setFormError(error.message || "Unable to load profile.");
                }
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        };

        loadProfile();

        return () => {
            isActive = false;
        };
    }, [baseUrl, user?.id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditProfile = () => {
        setIsEditing(true);
        setFormError("");
        setFormSuccess("");
    };

    const handleCancelEdit = () => {
        if (profileSnapshot) {
            setFormValues({
                name: profileSnapshot.name || "",
                email: profileSnapshot.email || "",
                address: profileSnapshot.address || ""
            });
        }
        setIsEditing(false);
        setFormError("");
        setFormSuccess("");
    };

    const handlePasswordChange = (event) => {
        const { name, value } = event.target;
        setPasswordValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTogglePassword = () => {
        setIsPasswordEditing((prev) => !prev);
        setPasswordError("");
        setPasswordSuccess("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user?.id || isSaving || !isEditing) {
            return;
        }

        const payload = {
            name: formValues.name.trim(),
            address: formValues.address.trim()
        };

        if (!payload.name || !payload.address) {
            setFormError("Name and address are required.");
            return;
        }

        setIsSaving(true);
        setFormError("");
        setFormSuccess("");

        try {
            const response = await fetch(`${baseUrl}/api/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || "Unable to update profile.");
            }

            if (data.user) {
                setProfileSnapshot(data.user);
                login({
                    ...user,
                    ...data.user,
                    role: data.user.role || user.role || "user"
                });
            }

            setFormSuccess("Profile updated.");
            setIsEditing(false);
        } catch (error) {
            setFormError(error.message || "Unable to update profile.");
        } finally {
            setIsSaving(false);
        }
    };

    const handlePasswordSubmit = async () => {
        if (!user?.id || isPasswordSaving) {
            return;
        }

        const payload = {
            currentPassword: passwordValues.currentPassword,
            newPassword: passwordValues.newPassword,
            confirmPassword: passwordValues.confirmPassword
        };

        if (!payload.currentPassword || !payload.newPassword || !payload.confirmPassword) {
            setPasswordError("All password fields are required.");
            return;
        }

        if (payload.newPassword !== payload.confirmPassword) {
            setPasswordError("New password and confirmation do not match.");
            return;
        }

        setPasswordError("");
        setPasswordSuccess("");
        setIsPasswordSaving(true);

        try {
            const response = await fetch(`${baseUrl}/api/users/${user.id}/password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    currentPassword: payload.currentPassword,
                    newPassword: payload.newPassword
                })
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || "Unable to update password.");
            }

            setPasswordValues({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
            setPasswordSuccess("Password updated.");
        } catch (error) {
            setPasswordError(error.message || "Unable to update password.");
        } finally {
            setIsPasswordSaving(false);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#dbeafe,_transparent_65%)]" />
            <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-blue-200/60 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/3 translate-y-1/4 rounded-full bg-sky-200/60 blur-3xl" />

            <UserNavbar />

            <main className="relative z-10 mx-auto w-full max-w-4xl px-6 py-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-500">
                            User profile
                        </p>
                        <h1 className="text-3xl font-semibold text-slate-900">Profile settings</h1>
                        <p className="text-sm text-slate-600">Update your name and address.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        {isEditing ? (
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="cursor-pointer rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
                            >
                                Cancel edit
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleEditProfile}
                                className="cursor-pointer rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
                            >
                                Edit profile
                            </button>
                        )}
                        {/* <button
                            type="button"
                            onClick={handleTogglePassword}
                            className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-600 shadow-sm transition hover:border-blue-300"
                        >
                            {isPasswordEditing ? "Close password" : "Change password"}
                        </button> */}
                        <Link
                            to="/user-dashboard"
                            className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
                        >
                            Back to dashboard
                        </Link>
                    </div>
                </div>

                <section className="mt-8 rounded-xl border border-slate-200/70 bg-white/90 p-6 shadow-xl backdrop-blur">
                    {isLoading ? (
                        <div className="space-y-3 text-sm text-slate-500">Loading profile...</div>
                    ) : (
                        <div className="space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <span
                                    className="flex text-2xl font-semibold w-14 h-14 items-center justify-center rounded-full border border-slate-200 bg-linear-to-br from-[#0141cb] to-[#00a9fd] text-white"
                                    aria-label="Profile avatar"
                                >
                                    {(formValues.name || user?.name || "U").charAt(0)}
                                </span>

                                <label className="block text-sm font-semibold text-slate-700">
                                    Name
                                    <input
                                        type="text"
                                        name="name"
                                        value={formValues.name}
                                        onChange={handleChange}
                                        required
                                        disabled={!isEditing}
                                        className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm shadow-sm outline-none transition ${
                                            isEditing
                                                ? "border-slate-200 bg-white/80 text-slate-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                                                : "border-slate-200 bg-slate-100 text-slate-500"
                                        }`}
                                    />
                                </label>

                                <label className="block text-sm font-semibold text-slate-700">
                                    Email
                                    <input
                                        type="email"
                                        name="email"
                                        value={formValues.email}
                                        readOnly
                                        disabled
                                        className="mt-2 w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500 shadow-sm"
                                    />
                                </label>

                                <label className="block text-sm font-semibold text-slate-700">
                                    Address
                                    <input
                                        type="text"
                                        name="address"
                                        value={formValues.address}
                                        onChange={handleChange}
                                        required
                                        disabled={!isEditing}
                                        className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm shadow-sm outline-none transition ${
                                            isEditing
                                                ? "border-slate-200 bg-white/80 text-slate-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                                                : "border-slate-200 bg-slate-100 text-slate-500"
                                        }`}
                                    />
                                </label>

                                {isEditing && (
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="mt-2 w-full rounded-xl bg-linear-to-br from-[#0141cb] to-[#00a9fd] cursor-pointer py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {isSaving ? "Saving changes..." : "Save changes"}
                                    </button>
                                )}

                                {formError && (
                                    <p className="text-sm text-red-600">{formError}</p>
                                )}
                                {formSuccess && (
                                    <p className="text-sm text-emerald-600">{formSuccess}</p>
                                )}
                            </form>

                            <div className="border-t border-slate-200/70 pt-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">Change password</p>
                                        <p className="text-xs text-slate-500">Use your current password to set a new one.</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleTogglePassword}
                                        className="cursor-pointer rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
                                    >
                                        {isPasswordEditing ? "Cancel" : "Change Password"}
                                    </button>
                                </div>

                                {isPasswordEditing && (
                                    <div className="mt-4 space-y-3">
                                        <label className="block text-sm font-semibold text-slate-700">
                                            Current password
                                            <input
                                                type="password"
                                                name="currentPassword"
                                                value={passwordValues.currentPassword}
                                                onChange={handlePasswordChange}
                                                className="mt-2 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                                            />
                                        </label>
                                        <label className="block text-sm font-semibold text-slate-700">
                                            New password
                                            <input
                                                type="password"
                                                name="newPassword"
                                                value={passwordValues.newPassword}
                                                onChange={handlePasswordChange}
                                                className="mt-2 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                                            />
                                        </label>
                                        <label className="block text-sm font-semibold text-slate-700">
                                            Confirm password
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={passwordValues.confirmPassword}
                                                onChange={handlePasswordChange}
                                                className="mt-2 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                                            />
                                        </label>
                                        <button
                                            type="button"
                                            onClick={handlePasswordSubmit}
                                            disabled={isPasswordSaving}
                                            className="mt-2 w-full rounded-xl bg-linear-to-br from-[#0141cb] to-[#00a9fd] cursor-pointer py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
                                        >
                                            {isPasswordSaving ? "Updating password..." : "Update password"}
                                        </button>
                                        {passwordError && (
                                            <p className="text-sm text-red-600">{passwordError}</p>
                                        )}
                                        {passwordSuccess && (
                                            <p className="text-sm text-emerald-600">{passwordSuccess}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default UserProfile;
