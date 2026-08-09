import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from '../assets/logo.png';

const UserNavbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate("/login/user");
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
                <Link to="/user-dashboard" className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-200 text-sm font-semibold shadow-lg">
                        <img
                            src={logo}
                            alt="logo"
                            className="h-8 w-8 object-contain"
                        />
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-500">RateStore</p>
                        <p className="text-base font-semibold text-slate-900">User Portal</p>
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

                    <div ref={menuRef} onClick={handleToggleMenu} className="cursor-pointer relative flex items-center gap-2">
                        <span
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-linear-to-br from-[#0141cb] to-[#00a9fd] text-white transition hover:border-slate-300"
                            aria-haspopup="true"
                            aria-expanded={isMenuOpen}
                            aria-label="Open profile menu"
                        >
                            {user.name?.charAt(0)}
                        </span>

                        <span className="hidden text-sm text-gray-700 sm:inline">
                            Hello, {user.name?.split(' ')[0] || 'User'}
                        </span>

                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className={`text-gray-700 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>

                        {isMenuOpen && (
                            <div className="absolute right-0 top-10 mt-2 w-40 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
                                <Link
                                    to="/profile/user"
                                    onClick={handleCloseMenu}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-slate-700 w-4 h-4" viewBox="0 -960 960 960"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm146.5-204.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm100-95.5q47-15.5 86-44.5-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160q53 0 100-15.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm-43-43Zm0 360Z"/></svg>
                                    Profile
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

export default UserNavbar;