import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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
      login({
        user: { ...userPayload, role: userPayload.role || "user" },
        token: data.token || null
      });

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
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at top, #dbeafe, transparent 58%)" }}
      />
      <div className="absolute -top-16 right-0 h-64 w-64 rounded-full bg-blue-200/70 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/3 translate-y-1/4 rounded-full bg-sky-200/70 blur-3xl" />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-xl items-center px-6 py-14">
        <div className="grid w-full overflow-hidden rounded-lg bg-white/90 shadow-lg backdrop-blur">
          <section className="px-8 md:px-10 pt-10 pb-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  {isSignup ? "Create your account" : "Welcome Back 👋"}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {isSignup
                    ? "Create your account to start creating tasks."
                    : "Login to access your account."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2">
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
                      className="mt-2 w-full rounded-lg border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-slate-800 focus:ring-2 focus:ring-slate-500"
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
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-slate-800 focus:ring-2 focus:ring-slate-500"
                  />
                </label>

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
                      className="w-full rounded-lg border border-slate-200 bg-white/80 px-4 py-3 pr-12 text-sm text-slate-800 shadow-sm outline-none transition focus:border-slate-800 focus:ring-2 focus:ring-slate-500"
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
                    <button type="button" className="cursor-pointer font-semibold text-slate-900 hover:text-slate-800">
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex justify-center items-center gap-2 mt-5 w-full rounded-lg bg-slate-900 hover:bg-slate-800 py-3 text-sm md:text-base cursor-pointer font-semibold text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-70"
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

              <p className="text-center text-sm text-slate-500">
                {isSignup ? "Already have an account? " : "New here? "}
                <button
                  type="button"
                  onClick={() => {
                    setFormError("");
                    setIsSignup((prev) => !prev);
                  }}
                  className="cursor-pointer font-semibold text-slate-900"
                >
                  {isSignup ? "Sign in" : "Create an account"}
                </button>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UserLogin;
