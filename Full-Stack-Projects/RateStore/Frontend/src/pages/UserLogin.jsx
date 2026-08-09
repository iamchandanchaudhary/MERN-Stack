import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";

const UserLogin = () => {
  const { login, backendUrl } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    const trimmedEmail = email.trim().toLowerCase();
    const endpoint = isSignup ? "/api/users/register" : "/api/users/login";
    const baseUrl = backendUrl.endsWith("/")
      ? backendUrl.slice(0, -1)
      : backendUrl;
    const payload = isSignup
      ? {
        name: name.trim(),
        email: trimmedEmail,
        password,
        address: address.trim()
      }
      : {
        email: trimmedEmail,
        password
      };

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to complete request.");
      }

      const userPayload = data.user || { email: trimmedEmail, role: "user" };
      login({ ...userPayload, role: userPayload.role || "user" });

      const nextPath = location.state?.from?.pathname || "/user-dashboard";
      navigate(nextPath, { replace: true });
    } catch (error) {
      setFormError(error.message || "Unable to complete request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-blue-50 text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#dbeafe,_transparent_58%)]" />
      <div className="absolute -top-16 right-0 h-64 w-64 rounded-full bg-blue-200/70 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/3 translate-y-1/4 rounded-full bg-sky-200/70 blur-3xl" />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-xl items-center px-6 py-14">
        <div className="grid w-full overflow-hidden rounded-xl bg-white/90 shadow-lg backdrop-blur">
          <section className="px-8 md:px-10 pt-10 pb-8">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-500">
                  {isSignup ? "User signup" : "User login"}
                </p>
                <h2 className="text-2xl font-semibold text-slate-900">
                  {isSignup ? "Create your account" : "Welcome Back 👋"}
                </h2>
                <p className="text-sm text-slate-500">
                  {isSignup
                    ? "Create your User account to start reviewing stores."
                    : "Login to access your User account."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignup && (
                  <label className="block text-sm font-semibold text-slate-700">
                    Name
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Enter name"
                      autoComplete="name"
                      required
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                    />
                  </label>
                )}

                <label className="block text-sm font-semibold text-slate-700">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter email"
                    autoComplete="email"
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  />
                </label>

                {isSignup && (
                  <label className="block text-sm font-semibold text-slate-700">
                    Address
                    <input
                      type="text"
                      name="address"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      placeholder="Enter address"
                      autoComplete="street-address"
                      required
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                    />
                  </label>
                )}

                <label className="block text-sm font-semibold text-slate-700">
                  {isSignup ? "Create Password" : "Password"}
                  <div className="relative mt-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder={isSignup ? "Create password" : "Enter password"}
                      autoComplete={isSignup ? "new-password" : "current-password"}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 pr-12 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-4 flex items-center text-slate-400 transition hover:text-slate-500"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                          <path d="M3.53 2.47a.75.75 0 0 1 1.06 0l16.94 16.94a.75.75 0 1 1-1.06 1.06l-2.18-2.18A10.82 10.82 0 0 1 12 20C6.95 20 2.73 16.89 1.06 12.5a11.77 11.77 0 0 1 3.37-4.77L2.47 3.53a.75.75 0 0 1 0-1.06zM9.4 6.7l1.62 1.62a3 3 0 0 0 4.16 4.16l1.62 1.62A5 5 0 0 1 9.4 6.7z" />
                          <path d="M11.56 5.05A10.9 10.9 0 0 1 12 5c5.05 0 9.27 3.11 10.94 7.5-.52 1.36-1.27 2.6-2.22 3.68l-1.44-1.44c.7-.78 1.28-1.65 1.72-2.59C19.1 9.43 15.8 7 12 7c-.29 0-.58.01-.86.04l-1.58-1.58z" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                          <path d="M12 5c5.05 0 9.27 3.11 10.94 7.5C21.27 16.89 17.05 20 12 20S2.73 16.89 1.06 12.5C2.73 8.11 6.95 5 12 5zm0 2C8.2 7 4.9 9.43 3.5 12.5 4.9 15.57 8.2 18 12 18s7.1-2.43 8.5-5.5C19.1 9.43 15.8 7 12 7zm0 2.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </label>

                {!isSignup && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-slate-600">
                      <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                      Keep me signed in
                    </label>
                    <button type="button" className="cursor-pointer font-semibold text-blue-600 hover:text-blue-500">
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex justify-center items-center gap-2mt-3 w-full rounded-xl bg-linear-to-br from-[#0141cb] to-[#00a9fd]  py-3 text-sm md:text-base cursor-pointer font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-white" viewBox="0 -960 960 960"><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" /></svg>
                  {isSubmitting
                    ? isSignup
                      ? "Creating account..."
                      : "Logging in..."
                    : isSignup
                      ? "Create account"
                      : "Login"}
                </button>

                {formError && (
                  <p className="text-sm text-red-600">
                    {formError}
                  </p>
                )}
              </form>

              {/* <div className="space-y-3">
                <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  <span className="h-px flex-1 bg-slate-200" />
                  or continue with
                  <span className="h-px flex-1 bg-slate-200" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300">
                    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
                      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 32.7 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.2-.4-3.5z" />
                      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.5 4 24 4c-7.7 0-14.4 4.3-17.7 10.7z" />
                      <path fill="#4CAF50" d="M24 44c5.3 0 10.3-2 14-5.3l-6.5-5.3c-2 1.5-4.6 2.6-7.5 2.6-5.3 0-9.8-3.4-11.4-8.1l-6.6 5.1C9.5 39.5 16.2 44 24 44z" />
                      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1 2.7-3 5-5.8 6.6l6.5 5.3c-3.1 2.9-7 4.6-12 4.6-7.7 0-14.4-4.3-17.7-10.7l6.6-5.1C14.2 32.6 18.7 36 24 36c5.4 0 9.9-3.3 11.3-8H24v-8h19.6z" />
                    </svg>
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                      <path d="M16.7 2c-.9.1-1.9.6-2.5 1.3-.6.7-1.1 1.7-1 2.7 1 .1 2-.4 2.6-1.1.6-.7 1-1.7.9-2.9z" />
                      <path d="M20.4 17.4c-.4.9-.9 1.7-1.6 2.4-.9.9-1.9 1.5-3.2 1.5-1.3 0-1.8-.8-3.4-.8-1.6 0-2.1.8-3.4.8-1.3 0-2.3-.5-3.2-1.5-1.9-1.9-3.4-5.4-1.4-8.7.9-1.4 2.5-2.3 4.2-2.3 1.3 0 2.4.8 3.2.8.7 0 2.1-.9 3.6-.8.6 0 2.3.2 3.4 1.7-2.8 1.6-2.3 5.5.8 6.9z" />
                    </svg>
                    Apple
                  </button>
                </div>
              </div> */}

              <p className="text-center text-sm text-slate-500">
                {isSignup ? "Already have an account? " : "New here? "}
                <button
                  type="button"
                  onClick={() => {
                    setFormError("");
                    setIsSignup((prev) => !prev);
                  }}
                  className="cursor-pointer font-semibold text-blue-600"
                >
                  {isSignup ? "Sign in" : "Create an account"}
                </button>
              </p>
            </div>

            <div className="w-full flex justify-center mt-2">
              <Link
                to="/"
                className="cursor-pointer flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-slate-700 w-4 h-4" viewBox="0 -960 960 960"><path d="M280-120 80-320l200-200 57 56-104 104h607v80H233l104 104-57 56Zm400-320-57-56 104-104H120v-80h607L623-784l57-56 200 200-200 200Z" /></svg>
                Switch role
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UserLogin;
