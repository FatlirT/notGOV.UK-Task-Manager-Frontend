export default function Header() {
  return (
    <header className="govuk-header" data-module="govuk-header">
      <div className="govuk-header__container govuk-width-container">
        <div className="govuk-header__logo">
          <a
            href="/"
            className="govuk-header__link govuk-header__link--homepage"
            aria-label="GOV.UK homepage"
          >
            <h1 className="govuk-header__link--homepage font-black">
              !GOV
              <span className="text-[#42ecff]">.</span>UK
            </h1>
          </a>
        </div>

        {/* Navigation */}
        <div className="govuk-header__content">
          <nav className="govuk-header__navigation" aria-label="Menu">
            <ul
              id="navigation"
              className="govuk-header__navigation-list flex gap-6 ml-6"
            >
              <li className="govuk-header__navigation-item">
                <a className="govuk-header__link" href="/tasks">
                  Tasks list
                </a>
              </li>

              <li className="govuk-header__navigation-item">
                <a className="govuk-header__link" href="/tasks/new">
                  Create task
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
