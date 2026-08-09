import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from '../assets/logo.png';

const AdminNavbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate("/login/admin");
    };

    const handleToggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!menuRef.current) {
                return;
            }

            if (!menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="relative z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
                <Link to="/admin" className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-200 text-sm font-semibold shadow-lg">
                        <img
                            src={logo}
                            alt="logo"
                            className="h-8 w-8 object-contain"
                        />
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-500">RateStore</p>
                        <p className="text-base font-semibold text-slate-900">Admin Console</p>
                    </div>
                </Link>

                <div className="flex flex-wrap items-center gap-3">
                    <Link
                        to="/"
                        className="cursor-pointer flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-slate-700 w-4 h-4" viewBox="0 -960 960 960"><path d="M280-120 80-320l200-200 57 56-104 104h607v80H233l104 104-57 56Zm400-320-57-56 104-104H120v-80h607L623-784l57-56 200 200-200 200Z" /></svg>
                        Switch role
                    </Link>

                    <div ref={menuRef} onClick={handleToggleMenu} className="relative flex cursor-pointer items-center gap-2">
                        <span
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-linear-to-br from-[#0141cb] to-[#00a9fd] text-white transition hover:border-slate-300"
                            aria-haspopup="true"
                            aria-expanded={isMenuOpen}
                            aria-label="Open profile menu"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-white w-5 h-5" viewBox="0 -960 960 960"><path d="M380.5-480.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17ZM480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-400Zm0-315-240 90v189q0 54 15 105t41 96q42-21 88-33t96-12q50 0 96 12t88 33q26-45 41-96t15-105v-189l-240-90Zm-70 523q-34 8-65 22 29 30 63 52t72 34q38-12 72-34t63-52q-31-14-65-22t-70-8q-36 0-70 8Z" /></svg>
                        </span>

                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className={`text-gray-700 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`}
                            aria-hidden="true"
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>

                        {isMenuOpen && (
                            <div className="absolute right-0 top-10 mt-2 w-44 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
                                <Link
                                    to="/admin"
                                    onClick={handleCloseMenu}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-slate-700 w-4 h-4" viewBox="0 -960 960 960"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" /></svg>
                                    Dashboard
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleCloseMenu();
                                        handleLogout();
                                    }}
                                    className="cursor-pointer flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-red-600 w-4 h-4" viewBox="0 -960 960 960"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
