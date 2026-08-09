import { useState } from "react";

const LoginForm = ({
  role,
  formData,
  loginError,
  isSubmitting,
  showDemoCredentialsButton,
  onInputChange,
  onFillDemoCredentials,
  onSubmit,
}) => {
  const inputClassName =
    "w-full rounded-xl border border-[#d2dbea] bg-white px-[14px] py-3 font-body text-[0.98rem] focus:border-[var(--accent-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-75";

  const buttonBaseClassName =
    "rounded-xl border-0 px-4 py-[11px] font-body text-[0.94rem] font-bold transition-transform duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-75 disabled:transform-none";

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="mt-5 grid max-w-[520px] gap-2.5" onSubmit={onSubmit}>
      <label htmlFor="identifier" className="text-[0.9rem] font-bold">
        {role.identifierLabel}
      </label>
      <input
        id="identifier"
        name="identifier"
        type="text"
        className={inputClassName}
        value={formData.identifier}
        onChange={onInputChange}
        disabled={isSubmitting}
        placeholder={`Enter ${role.identifierLabel.toLowerCase()}`}
        autoComplete="username"
      />

      <label htmlFor="password" className="text-[0.9rem] font-bold">
        Password
      </label>
      <div className="relative">
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          className={`${inputClassName} pr-12`}
          value={formData.password}
          onChange={onInputChange}
          disabled={isSubmitting}
          placeholder="Enter password"
          autoComplete="current-password"
        />
        <button
          type="button"
          onClick={() => setShowPassword((previous) => !previous)}
          disabled={isSubmitting}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 border-0 bg-transparent p-0 text-[#5b6b82] transition-colors hover:text-[var(--accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
            aria-hidden="true"
          >
            {showPassword ? (
              <>
                <path d="M3 3l18 18" />
                <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                <path d="M9.9 5.1A10.9 10.9 0 0112 5c5.5 0 9.2 4.5 10 7-0.3 0.9-1.1 2.3-2.3 3.6" />
                <path d="M6.2 6.2C4.1 7.5 2.7 9.7 2 12c0.8 2.5 4.5 7 10 7 2.3 0 4.2-0.8 5.7-1.9" />
              </>
            ) : (
              <>
                <path d="M2 12s3.7-7 10-7 10 7 10 7-3.7 7-10 7-10-7-10-7z" />
                <circle cx="12" cy="12" r="3" />
              </>
            )}
          </svg>
        </button>
      </div>

      {loginError && <p className="mb-1 mt-0.5 text-[0.88rem] font-bold text-[#c02f2f]">{loginError}</p>}

      <div className="mt-2 flex flex-wrap gap-2.5">
        {/* {showDemoCredentialsButton && (
          <button
            type="button"
            className={`${buttonBaseClassName} bg-[#eef4ff] text-[#1f2f49]`}
            onClick={onFillDemoCredentials}
            disabled={isSubmitting}
          >
            Use Demo Credentials
          </button>
        )} */}
        <button
          type="submit"
          className={`${buttonBaseClassName} bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
