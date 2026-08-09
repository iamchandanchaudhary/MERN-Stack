import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import { AuthContext } from "../context/AuthContext";

const SystemAdministrator = () => {
    const { backendUrl } = useContext(AuthContext);
    const baseUrl = useMemo(() => (
        backendUrl.endsWith("/") ? backendUrl.slice(0, -1) : backendUrl
    ), [backendUrl]);

    const [stats, setStats] = useState({
        users: 0,
        storeOwners: 0,
        stores: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    const [statsError, setStatsError] = useState("");

    const adminCards = [
        {
            title: "Registered Users",
            description: "Review every user account and registration details.",
            to: "/admin/users",
            svg: <svg xmlns="http://www.w3.org/2000/svg" className='w-8 h-8 fill-white' viewBox="0 0 640 640"><path d="M240 192C240 147.8 275.8 112 320 112C364.2 112 400 147.8 400 192C400 236.2 364.2 272 320 272C275.8 272 240 236.2 240 192zM448 192C448 121.3 390.7 64 320 64C249.3 64 192 121.3 192 192C192 262.7 249.3 320 320 320C390.7 320 448 262.7 448 192zM144 544C144 473.3 201.3 416 272 416L368 416C438.7 416 496 473.3 496 544L496 552C496 565.3 506.7 576 520 576C533.3 576 544 565.3 544 552L544 544C544 446.8 465.2 368 368 368L272 368C174.8 368 96 446.8 96 544L96 552C96 565.3 106.7 576 120 576C133.3 576 144 565.3 144 552L144 544z"/></svg>
        },
        {
            title: "Store Owners",
            description: "Track store owner registrations and contact information.",
            to: "/admin/store-owners",
            svg: <svg xmlns="http://www.w3.org/2000/svg" className='w-8 h-8 fill-white' viewBox="0 -960 960 960"><path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z" /></svg>
        },
        {
            title: "Store List",
            description: "Inspect all created stores with their live details.",
            to: "/admin/stores",
            svg: <svg xmlns="http://www.w3.org/2000/svg" className='w-8 h-8 fill-white' viewBox="0 -960 960 960"><path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z"/></svg>
        }
    ];

    useEffect(() => {
        let isActive = true;

        const loadStats = async () => {
            setIsLoading(true);
            setStatsError("");

            try {
                const [usersResponse, ownersResponse, storesResponse] = await Promise.all([
                    fetch(`${baseUrl}/api/admin/users`),
                    fetch(`${baseUrl}/api/admin/store-owners`),
                    fetch(`${baseUrl}/api/stores`)
                ]);

                const [usersData, ownersData, storesData] = await Promise.all([
                    usersResponse.json().catch(() => ({})),
                    ownersResponse.json().catch(() => ({})),
                    storesResponse.json().catch(() => ({}))
                ]);

                if (!usersResponse.ok) {
                    throw new Error(usersData.message || "Unable to load user totals.");
                }

                if (!ownersResponse.ok) {
                    throw new Error(ownersData.message || "Unable to load store owner totals.");
                }

                if (!storesResponse.ok) {
                    throw new Error(storesData.message || "Unable to load store totals.");
                }

                if (isActive) {
                    setStats({
                        users: Array.isArray(usersData.users) ? usersData.users.length : 0,
                        storeOwners: Array.isArray(ownersData.storeOwners) ? ownersData.storeOwners.length : 0,
                        stores: Array.isArray(storesData.stores) ? storesData.stores.length : 0
                    });
                }
            } catch (error) {
                if (isActive) {
                    setStatsError(error.message || "Unable to load dashboard totals.");
                }
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        };

        loadStats();

        return () => {
            isActive = false;
        };
    }, [baseUrl]);

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#dbeafe,_transparent_65%)]" />
            <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-blue-200/60 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/3 translate-y-1/4 rounded-full bg-sky-200/60 blur-3xl" />

            <AdminNavbar />

            <main className="relative z-10 mx-auto w-full max-w-6xl px-6 py-10">
                <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-blue-700">System Administrator</h1>
                        <p className="text-sm text-slate-600">
                            Manage users, store owners, and live storefronts in one place.
                        </p>
                    </div>
                </header>

                {statsError && (
                    <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-4 text-sm text-red-700">
                        {statsError}
                    </div>
                )}

                <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        { label: "Total users", value: stats.users },
                        { label: "Store owners", value: stats.storeOwners },
                        { label: "Total stores", value: stats.stores }
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-2xl border border-slate-200/70 bg-white/90 px-6 py-5 shadow-sm"
                        >
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                                {stat.label}
                            </p>
                            <p className="mt-3 text-3xl font-semibold text-slate-900">
                                {isLoading ? "..." : stat.value}
                            </p>
                        </div>
                    ))}
                </section>

                <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {adminCards.map((card) => (
                        <Link
                            key={card.title}
                            to={card.to}
                            className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-slate-200/70 bg-white/90 p-6 shadow-lg backdrop-blur hover:border-slate-300"
                        >
                            <div className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-slate-200/50 blur-2xl transition duration-300 group-hover:scale-110" />
                            <div className="pointer-events-none absolute -bottom-16 -left-8 h-28 w-28 rounded-full bg-slate-200/40 blur-2xl transition duration-300 group-hover:scale-110" />

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl p-2 bg-blue-700 ring-1 ring-slate-500/20 transition duration-300 group-hover:bg-blue-600">
                                {card.svg}
                            </div>

                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-semibold text-slate-900">
                                        {card.title}
                                    </h2>
                                    <p className="text-sm text-slate-600">
                                        {card.description}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-auto flex items-center justify-between text-sm font-semibold text-slate-700">
                                <span>Open view</span>
                                <svg viewBox="0 -960 960 960" className="h-5 w-5 fill-slate-500 transition group-hover:fill-slate-700" aria-hidden="true">
                                    <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default SystemAdministrator;
