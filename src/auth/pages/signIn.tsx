// Sign-In Page.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layout";
import { useAuth } from "../../context/AuthContext";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Enter both email and password");
      return;
    }

    // Replace this with real sign-in API call
    const user_data = { email: email, first_name: "sadsa", last_name: "" }; // Mock user data returned from API
    if (user_data) {
      login(user_data);
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <AuthLayout>
      <div className="w-1/2">
        <h1 className="govuk-heading-l mb-6 text-center">Sign in</h1>

        {error && (
          <div
            className="govuk-error-summary"
            aria-labelledby="error-summary-title"
            role="alert"
            tabIndex={-1}
          >
            <h2 className="govuk-error-summary__title" id="error-summary-title">
              There is a problem
            </h2>
            <div className="govuk-error-summary__body">
              <ul className="govuk-list govuk-error-summary__list">
                <li>{error}</li>
              </ul>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div
            className={`govuk-form-group ${error ? "govuk-form-group--error" : ""}`}
          >
            <label htmlFor="email" className="govuk-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`govuk-input ${error ? "govuk-input--error" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div
            className={`govuk-form-group ${error ? "govuk-form-group--error" : ""}`}
          >
            <label htmlFor="password" className="govuk-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={`govuk-input ${error ? "govuk-input--error" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="govuk-button w-full mt-6">
            Sign in
          </button>
        </form>

        <p className="govuk-body mt-4 text-center">
          <Link to="/fo" className="govuk-link">
            Forgot your password?
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignInPage;
