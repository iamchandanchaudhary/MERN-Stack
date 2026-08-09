import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.webp';
import logo from '../assets/logo.png';

const RoleSelectionPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900">
      <main className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-12">
        <header className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-200 text-sm font-semibold shadow-md">
              <img
                src={logo}
                alt="RateStore logo"
                className="h-8 w-8 object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
                RateStore
              </p>
              <p className="text-xs text-slate-600">
                Discover Store
              </p>
            </div>
          </div>

          <h1 className="text-[clamp(2.4rem,4vw,4rem)] font-semibold leading-tight text-slate-900">
            Discover. Rate. Help Stores <span className='text-[#0d4ae7]'>Grow.</span>
          </h1>
          <p className="max-w-xl text-base text-slate-600">
            RateStore is a platform where users rate and review stores, helping others make better decisions.
          </p>

          <div className="flex flex-wrap gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
            <span className="rounded-full border border-white/70 bg-white/80 px-3 py-1 shadow-sm">
              Rate Store
            </span>
            <span className="rounded-full border border-white/70 bg-white/80 px-3 py-1 shadow-sm">
              Trusted Reviews
            </span>
            <span className="rounded-full border border-white/70 bg-white/80 px-3 py-1 shadow-sm">
              Discover
            </span>
          </div>
        </header>

        <div className="relative">
          <div className="absolute -inset-4" />
          <div className="relative overflow-hidden">
            <img
              src={heroImage}
              alt="RateStore platform preview"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                Unified stores
              </p>
              <p className="text-sm text-slate-700">
                A single place for trust, reviews, and growth.
              </p>
            </div>
          </div>
        </div>
      </main>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 lg:px-12">
        <div className="grid gap-6 md:grid-cols-3">
          <Link
            to="/login/user"
            aria-label="Sign in to access the User Dashboard"
            className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-slate-200/70 bg-linear-to-br from-white/90 via-slate-50/70 to-slate-100/60 p-6 shadow-lg backdrop-blur transition duration-300 hover:border-slate-300/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60"
          >
            <div className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-slate-300/40 blur-2xl transition duration-300 group-hover:scale-110" />
            <div className="pointer-events-none absolute -bottom-16 -left-8 h-28 w-28 rounded-full bg-slate-200/40 blur-2xl transition duration-300 group-hover:scale-110" />

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-slate-900">
                  User Dashboard
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl p-2 bg-blue-700 ring-1 ring-slate-500/20 transition duration-300 group-hover:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className='w-8 h-8 fill-white' viewBox="0 0 640 640"><path d="M240 192C240 147.8 275.8 112 320 112C364.2 112 400 147.8 400 192C400 236.2 364.2 272 320 272C275.8 272 240 236.2 240 192zM448 192C448 121.3 390.7 64 320 64C249.3 64 192 121.3 192 192C192 262.7 249.3 320 320 320C390.7 320 448 262.7 448 192zM144 544C144 473.3 201.3 416 272 416L368 416C438.7 416 496 473.3 496 544L496 552C496 565.3 506.7 576 520 576C533.3 576 544 565.3 544 552L544 544C544 446.8 465.2 368 368 368L272 368C174.8 368 96 446.8 96 544L96 552C96 565.3 106.7 576 120 576C133.3 576 144 565.3 144 552L144 544z"/></svg>
              </div>
            </div>

            <p className="text-sm text-slate-600">
              Discover trusted stores, track your reviews, and give your
              personalized recommendations.
            </p>

            <div className="mt-auto flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>Enter dashboard</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="h-6 w-6 fill-slate-500 transition-all group-hover:fill-slate-700"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg>
            </div>
          </Link>

          <Link
            to="/login/store-owner"
            aria-label="Sign in to access the Store Owner workspace"
            className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-slate-200/70 bg-linear-to-br from-white/90 via-slate-50/70 to-slate-100/60 p-6 shadow-lg backdrop-blur transition duration-300 hover:border-slate-300/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60"
          >
            <div className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-slate-300/40 blur-2xl transition duration-300 group-hover:scale-110" />
            <div className="pointer-events-none absolute -bottom-16 -left-8 h-28 w-28 rounded-full bg-slate-200/40 blur-2xl transition duration-300 group-hover:scale-110" />

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-slate-900">
                  Store Owner
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl p-2 bg-blue-700 ring-1 ring-slate-500/20 transition duration-300 group-hover:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className='w-8 h-8 fill-white' viewBox="0 -960 960 960"><path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z"/></svg>
              </div>
            </div>

            <p className="text-sm text-slate-600">
              Monitor reputation, respond fast, and track growth with a
              focused business console.
            </p>

            <div className="mt-auto flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>Enter workspace</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="h-6 w-6 fill-slate-500 transition-all group-hover:fill-slate-700"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg>
            </div>
          </Link>

          <Link
            to="/login/admin"
            aria-label="Sign in to access the System Administrator control room"
            className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-xl border border-slate-200/70 bg-linear-to-br from-white/90 via-slate-50/70 to-slate-100/60 p-6 shadow-lg backdrop-blur transition duration-300 hover:border-slate-300/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60"
          >
            <div className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-slate-300/40 blur-2xl transition duration-300 group-hover:scale-110" />
            <div className="pointer-events-none absolute -bottom-16 -left-8 h-28 w-28 rounded-full bg-slate-200/40 blur-2xl transition duration-300 group-hover:scale-110" />

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-slate-900">
                  System Administrator
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl p-2 bg-blue-700 ring-1 ring-slate-500/20 transition duration-300 group-hover:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className='w-8 h-8 fill-white' viewBox="0 -960 960 960"><path d="M380.5-480.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17ZM480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-400Zm0-315-240 90v189q0 54 15 105t41 96q42-21 88-33t96-12q50 0 96 12t88 33q26-45 41-96t15-105v-189l-240-90Zm-70 523q-34 8-65 22 29 30 63 52t72 34q38-12 72-34t63-52q-31-14-65-22t-70-8q-36 0-70 8Z"/></svg>
              </div>
            </div>

            <p className="text-sm text-slate-600">
              Govern platform operations, users, and data quality across the
              platform.
            </p>

            <div className="mt-auto flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>Enter control room</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="h-6 w-6 fill-slate-500 transition-all group-hover:fill-slate-700"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RoleSelectionPage;