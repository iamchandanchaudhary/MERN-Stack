/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext();

const STORAGE_TOKEN_KEY = "ams_auth_token";
const EMPTY_SESSION = {
    id: "",
    role: "",
    identifier: "",
    name: "",
    token: "",
};

const AuthContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [authSession, setAuthSession] = useState(EMPTY_SESSION);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    const clearSession = () => {
        localStorage.removeItem(STORAGE_TOKEN_KEY);
        setAuthSession(EMPTY_SESSION);
    };

    const getAuthToken = () => {
        return authSession.token || localStorage.getItem(STORAGE_TOKEN_KEY) || "";
    };

    const getAuthorizedConfig = () => {
        const token = getAuthToken();

        if (!token) {
            return {};
        }

        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    };

    const restoreSession = async (token) => {
        try {
            const response = await axios.get(`${backendUrl}/api/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const user = response?.data?.user;

            if (!user?.role || !user?.identifier) {
                clearSession();
                return false;
            }

            setAuthSession({
                id: user.id || "",
                role: user.role,
                identifier: user.identifier,
                name: user.name || "",
                token,
            });
            localStorage.setItem(STORAGE_TOKEN_KEY, token);
            return true;
        } catch {
            clearSession();
            return false;
        }
    };

    useEffect(() => {
        const initializeSession = async () => {
            const token = localStorage.getItem(STORAGE_TOKEN_KEY);

            if (!token) {
                setIsAuthLoading(false);
                return;
            }

            await restoreSession(token);
            setIsAuthLoading(false);
        };

        initializeSession();
    }, [backendUrl]);

    const login = async (role, identifier, password) => {
        const response = await axios.post(`${backendUrl}/api/auth/login`, {
            role,
            identifier,
            password,
        });

        const token = response?.data?.token;
        const user = response?.data?.user;

        if (!token || !user?.role || !user?.identifier) {
            throw new Error("Invalid login response.");
        }

        localStorage.setItem(STORAGE_TOKEN_KEY, token);
        setAuthSession({
            id: user.id || "",
            role: user.role,
            identifier: user.identifier,
            name: user.name || "",
            token,
        });

        return user;
    };

    const logout = async () => {
        const token = getAuthToken();

        try {
            if (token) {
                await axios.post(
                    `${backendUrl}/api/auth/logout`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
            }
        } catch {
            // Client still clears session even if logout API fails.
        } finally {
            clearSession();
        }
    };

    const createManagedUser = async (payload) => {
        const response = await axios.post(
            `${backendUrl}/api/admin/users`,
            payload,
            getAuthorizedConfig(),
        );

        return response.data;
    };

    const getManagedUsers = async (role = "") => {
        const response = await axios.get(`${backendUrl}/api/admin/users`, {
            ...getAuthorizedConfig(),
            params: role ? { role } : {},
        });

        return response.data;
    };

    const deleteManagedUser = async (userId) => {
        const response = await axios.delete(
            `${backendUrl}/api/admin/users/${userId}`,
            getAuthorizedConfig(),
        );

        return response.data;
    };

    const updateManagedUser = async (userId, payload) => {
        const response = await axios.patch(
            `${backendUrl}/api/admin/users/${userId}`,
            payload,
            getAuthorizedConfig(),
        );

        return response.data;
    };

    const getTeacherDashboardSummary = async () => {
        const response = await axios.get(
            `${backendUrl}/api/teacher/dashboard-summary`,
            getAuthorizedConfig(),
        );

        return response.data;
    };

    const getTeacherAttendanceMeta = async () => {
        const response = await axios.get(
            `${backendUrl}/api/teacher/attendance/meta`,
            getAuthorizedConfig(),
        );

        return response.data;
    };

    const getStudentsForAttendance = async ({ department, subject }) => {
        const response = await axios.get(
            `${backendUrl}/api/teacher/attendance/students`,
            {
                ...getAuthorizedConfig(),
                params: {
                    department,
                    subject,
                },
            },
        );

        return response.data;
    };

    const submitTeacherAttendance = async (payload) => {
        const response = await axios.post(
            `${backendUrl}/api/teacher/attendance`,
            payload,
            getAuthorizedConfig(),
        );

        return response.data;
    };

    const getStudentAttendance = async (filters = {}) => {
        const response = await axios.get(`${backendUrl}/api/student/attendance`, {
            ...getAuthorizedConfig(),
            params: filters,
        });

        return response.data;
    };

    const value = useMemo(
        () => ({
            backendUrl,
            authSession,
            isAuthLoading,
            isAuthenticated: Boolean(
                authSession.role && authSession.identifier && authSession.token,
            ),
            login,
            logout,
            createManagedUser,
            getManagedUsers,
            deleteManagedUser,
            updateManagedUser,
            getTeacherDashboardSummary,
            getTeacherAttendanceMeta,
            getStudentsForAttendance,
            submitTeacherAttendance,
            getStudentAttendance,
        }),
        [authSession, backendUrl, isAuthLoading],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
