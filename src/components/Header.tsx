import { ReactNode } from "react";

type HeaderProps = {
  children?: ReactNode; // children is optional
};

export default function Header({ children }: HeaderProps) {
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

        {/* Render any child elements passed to this header */}
        {children}
      </div>
    </header>
  );
}
