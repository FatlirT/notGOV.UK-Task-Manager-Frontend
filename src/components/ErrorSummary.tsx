// ------------------------------
// ErrorSummary.tsx
// ------------------------------
export type ErrorItem = {
  message: string;
  fieldId?: string;
};

const ErrorSummary = ({ errors }: { errors: ErrorItem[] }) => {
  const handleClick = (fieldId?: string) => {
    if (!fieldId) return;
    const el = document.getElementById(fieldId);
    if (el) {
      el.focus();
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (errors.length === 0) return null;

  return (
    <div
      className="govuk-error-summary"
      aria-labelledby="error-summary-title"
      role="alert"
      tabIndex={-1}
    >
      <h2 id="error-summary-title" className="govuk-error-summary__title">
        {errors.length > 1 ? "There are some problems" : "There is a problem"}
      </h2>
      <ul className="govuk-error-summary__list">
        {errors.map((err, idx) => (
          <li key={idx}>
            {err.fieldId ? (
              <a
                href={`#${err.fieldId}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(err.fieldId);
                }}
              >
                {err.message}
              </a>
            ) : (
              <span className="govuk-error-message">{err.message}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorSummary;
