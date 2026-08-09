import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Dashboard = () => {
    return (
        <div className="min-h-screen overflow-hidden bg-white text-slate-900">
            <main className=" z-10 mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-12">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <img
                            src={logo}
                            alt=""
                            className='w-10 h-10'
                        />

                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                                Task Management
                            </p>
                            <p className="text-xs text-slate-600">
                                Application
                            </p>
                        </div>
                    </div>

                    <h1 className="text-5xl font-semibold leading-tight text-slate-900">
                        Organize Tasks. Boost Productivity.<span className='text-[#0d4ae7]'> Achieve More.</span>
                    </h1>
                    <p className="max-w-xl text-base text-slate-600">
                        Stay organized, track progress. Task Management Application helps individuals and organizations plan, prioritize, and complete tasks efficiently from anywhere.
                    </p>

                    <div className="flex flex-wrap gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                        <span className="rounded-full border border-white/70 bg-white/80 px-3 py-1 shadow-sm">
                            Get Started
                        </span>
                        <span className="rounded-full border border-white/70 bg-white/80 px-3 py-1 shadow-sm">
                            Create Workspace
                        </span>
                        <span className="rounded-full border border-white/70 bg-white/80 px-3 py-1 shadow-sm">
                            Explore Features
                        </span>
                    </div>
                </div>

                <div className='flex flex-col gap-4 py-4'>
                    <Link
                        to="/login/user"
                        aria-label="Sign in to access the User Panel"
                        className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border border-slate-200/70 bg-linear-to-br from-white/90 via-slate-50/70 to-slate-100/60 p-6 shadow-lg backdrop-blur transition duration-300 hover:border-slate-300/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60"
                    >
                        <div className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-slate-300/40 blur-2xl transition duration-300 group-hover:scale-110" />
                        <div className="pointer-events-none absolute -bottom-16 -left-8 h-28 w-28 rounded-full bg-slate-200/40 blur-2xl transition duration-300 group-hover:scale-110" />

                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-semibold text-slate-900">
                                    Start Creating Tasks
                                </h2>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl p-2 bg-slate-900 ring-1 ring-slate-500/20 transition duration-300 group-hover:bg-slate-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className='w-8 h-8 fill-white' viewBox="0 0 640 640"><path d="M197.8 100.3C208.7 107.9 211.3 122.9 203.7 133.7L147.7 213.7C143.6 219.5 137.2 223.2 130.1 223.8C123 224.4 116 222 111 217L71 177C61.7 167.6 61.7 152.4 71 143C80.3 133.6 95.6 133.7 105 143L124.8 162.8L164.4 106.2C172 95.3 187 92.7 197.8 100.3zM197.8 260.3C208.7 267.9 211.3 282.9 203.7 293.7L147.7 373.7C143.6 379.5 137.2 383.2 130.1 383.8C123 384.4 116 382 111 377L71 337C61.6 327.6 61.6 312.4 71 303.1C80.4 293.8 95.6 293.7 104.9 303.1L124.7 322.9L164.3 266.3C171.9 255.4 186.9 252.8 197.7 260.4zM288 160C288 142.3 302.3 128 320 128L544 128C561.7 128 576 142.3 576 160C576 177.7 561.7 192 544 192L320 192C302.3 192 288 177.7 288 160zM288 320C288 302.3 302.3 288 320 288L544 288C561.7 288 576 302.3 576 320C576 337.7 561.7 352 544 352L320 352C302.3 352 288 337.7 288 320zM224 480C224 462.3 238.3 448 256 448L544 448C561.7 448 576 462.3 576 480C576 497.7 561.7 512 544 512L256 512C238.3 512 224 497.7 224 480zM128 440C150.1 440 168 457.9 168 480C168 502.1 150.1 520 128 520C105.9 520 88 502.1 88 480C88 457.9 105.9 440 128 440z"/></svg>
                            </div>
                        </div>

                        <p className="text-sm text-slate-600">
                            Stay organized and boost productivity with a powerful task management 
                            application designed for seamless workflow management.
                        </p>

                        <div className="mt-auto flex items-center justify-between text-sm font-semibold text-slate-700">
                            <span>Start Application</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="h-6 w-6 fill-slate-500 transition-all group-hover:fill-slate-700"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" /></svg>
                        </div>
                    </Link>

                    <Link
                        to="/login/admin"
                        aria-label="Sign in to access the Admin Panel"
                        className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border border-slate-200/70 bg-linear-to-br from-white/90 via-slate-50/70 to-slate-100/60 p-6 shadow-lg backdrop-blur transition duration-300 hover:border-slate-300/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60"
                    >
                        <div className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-slate-300/40 blur-2xl transition duration-300 group-hover:scale-110" />
                        <div className="pointer-events-none absolute -bottom-16 -left-8 h-28 w-28 rounded-full bg-slate-200/40 blur-2xl transition duration-300 group-hover:scale-110" />

                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-semibold text-slate-900">
                                    Admin Panel
                                </h2>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl p-2 bg-slate-900 ring-1 ring-slate-500/20 transition duration-300 group-hover:bg-slate-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className='w-8 h-8 fill-white' viewBox="0 -960 960 960"><path d="M380.5-480.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17ZM480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-400Zm0-315-240 90v189q0 54 15 105t41 96q42-21 88-33t96-12q50 0 96 12t88 33q26-45 41-96t15-105v-189l-240-90Zm-70 523q-34 8-65 22 29 30 63 52t72 34q38-12 72-34t63-52q-31-14-65-22t-70-8q-36 0-70 8Z" /></svg>
                            </div>
                        </div>

                        <p className="text-sm text-slate-600">
                            Empower your organization with centralized management, detailed analytics, and complete oversight of projects and productivity.
                        </p>

                        <div className="mt-auto flex items-center justify-between text-sm font-semibold text-slate-700">
                            <span>Enter control room</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="h-6 w-6 fill-slate-500 transition-all group-hover:fill-slate-700"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" /></svg>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    )
}

export default Dashboard;