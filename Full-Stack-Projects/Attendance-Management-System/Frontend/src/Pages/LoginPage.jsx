import { useContext, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import LoginForm from "../Components/LoginForm";
import PortalLayout from "../Components/PortalLayout";
import { AuthContext } from "../context/AuthContext";
import { getRoleConfig } from "../data/roleConfig";

const LoginPage = () => {
  const { roleKey } = useParams();
  const navigate = useNavigate();
  const { authSession, isAuthLoading, login } = useContext(AuthContext);

  const normalizedRoleKey = useMemo(() => roleKey?.toLowerCase() || "", [roleKey]);
  const role = getRoleConfig(normalizedRoleKey);
  
  // Demo credentials only for admin
  const demoCredentials = normalizedRoleKey === "admin" 
    ? { identifier: "admin@ams.com", password: "admin123@" }
    : null;
  const hasDemoCredentials = Boolean(demoCredentials);

  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const panelCaptionClassName = "mt-[10px] text-text-muted";

  if (!role) {
    return <Navigate to="/" replace />;
  }

  if (isAuthLoading) {
    return (
      <PortalLayout activeRole={role}>
        <section className="animate-fadeInUpFast">
          <h2 className="font-heading">{role.title} Login</h2>
          <p className={panelCaptionClassName}>Checking active session...</p>
        </section>
      </PortalLayout>
    );
  }

  if (authSession.role === normalizedRoleKey && authSession.identifier) {
    return <Navigate to={`/dashboard/${normalizedRoleKey}`} replace />;
  }

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (loginError) {
      setLoginError("");
    }
  };

  const fillDemoCredentials = () => {
    if (!demoCredentials) {
      return;
    }

    setFormData(demoCredentials);
    setLoginError("");
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const typedIdentifier = formData.identifier.trim();
    const typedPassword = formData.password;

    if (!typedIdentifier || !typedPassword) {
      setLoginError("Please enter both ID and password.");
      return;
    }

    setIsSubmitting(true);
    setLoginError("");

    try {
      await login(normalizedRoleKey, typedIdentifier, typedPassword);
      navigate(`/dashboard/${normalizedRoleKey}`);
    } catch (error) {
      const apiError = error?.response?.data?.message;
      setLoginError(apiError || "Unable to login right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PortalLayout activeRole={role}>
      <section className="animate-fadeInUpFast">
        <button
          type="button"
          className="mb-[14px] border-0 bg-transparent p-0 font-extrabold text-[var(--accent-primary)] transition-colors hover:text-[var(--accent-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2"
          onClick={() => navigate("/")}
        >
          Back to role selection
        </button>

        <h2 className="font-heading">{role.title} Login</h2>
        <p className={panelCaptionClassName}>
          Sign in to continue to your {role.title.toLowerCase()} dashboard.
        </p>
        {!hasDemoCredentials && (
          <p className="mt-1 text-[0.86rem] text-text-muted">
            Use the credentials created by your admin account.
          </p>
        )}

        <LoginForm
          role={role}
          formData={formData}
          loginError={loginError}
          isSubmitting={isSubmitting}
          showDemoCredentialsButton={hasDemoCredentials}
          onInputChange={handleInputChange}
          onFillDemoCredentials={fillDemoCredentials}
          onSubmit={handleLogin}
        />
      </section>
    </PortalLayout>
  );
};

export default LoginPage;
