// ForgotPassword.tsx
import { useState } from "react";
import AuthLayout from "../layout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Enter your email address");
      return;
    }

    // TODO: call your forgot password API
    console.log("Reset link sent to:", email);
    setSubmitted(true);
  };

  return (
    <AuthLayout>
      <div className="flex justify-center items-center py-12">
        <div className="w-full max-w-md bg-white p-8 rounded shadow">
          <h1 className="govuk-heading-l mb-6 text-center">
            Forgot your password?
          </h1>

          {submitted ? (
            <p className="govuk-body">
              If an account exists for <strong>{email}</strong>, you’ll receive
              an email with instructions to reset your password.
            </p>
          ) : (
            <>
              {error && (
                <div
                  className="govuk-error-summary"
                  aria-labelledby="error-summary-title"
                  role="alert"
                  tabIndex={-1}
                >
                  <h2
                    className="govuk-error-summary__title"
                    id="error-summary-title"
                  >
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
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`govuk-input ${error ? "govuk-input--error" : ""}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    aria-describedby={error ? "error-email" : undefined}
                  />
                </div>

                <button type="submit" className="govuk-button w-full mt-6">
                  Send reset link
                </button>
              </form>
            </>
          )}

          <p className="govuk-body mt-4 text-center">
            <a href="/login" className="govuk-link">
              Back to sign in
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
