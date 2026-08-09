import { createContext, useCallback, useMemo, useState } from "react";

export const AuthContext = createContext();
const STORAGE_KEY = "taskManagementAuth";

const AuthContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
    const [auth, setAuth] = useState(() => {
        try {
            const storedUser = localStorage.getItem(STORAGE_KEY);
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            return null;
        }
    });

    const user = auth?.user || null;
    const token = auth?.token || null;

    const login = useCallback((nextAuth) => {
        const nextValue = nextAuth?.user
            ? nextAuth
            : { user: nextAuth, token: nextAuth?.token || null };

        setAuth(nextValue);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(nextValue));
        } catch (error) {
            // Ignore storage errors (e.g., private mode).
        }
    }, []);

    const logout = useCallback(() => {
        setAuth(null);
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            // Ignore storage errors.
        }
    }, []);

    const scrollUp = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);

    const value = useMemo(() => ({
        backendUrl,
        scrollUp,
        user,
        token,
        login,
        logout,
        isAuthenticated: Boolean(token && user)
    }), [backendUrl, login, logout, scrollUp, token, user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider;
