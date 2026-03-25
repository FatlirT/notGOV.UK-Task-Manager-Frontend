type TaskListNavProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getVisiblePages(page: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (page <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (page >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [1, "...", page - 1, page, page + 1, "...", totalPages];
}

export default function TaskListNav({
  page,
  totalPages,
  onPageChange,
}: TaskListNavProps) {
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <nav
      className="govuk-pagination govuk-!-margin-top-4 w-full justify-center"
      role="navigation"
      aria-label="Pagination"
    >
      <ul className="govuk-pagination__list">
        <li className="govuk-pagination__item govuk-pagination__item--prev">
          <button
            type="button"
            className="govuk-link govuk-pagination__link"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            {"<"}
          </button>
        </li>

        {visiblePages.map((item, index) =>
          item === "..." ? (
            <li
              key={`ellipsis-${index}`}
              className="govuk-pagination__item govuk-pagination__item--ellipses"
            >
              …
            </li>
          ) : (
            <li
              key={item}
              className={`govuk-pagination__item${
                item === page ? " govuk-pagination__item--current" : ""
              }`}
            >
              <button
                type="button"
                className="govuk-link govuk-pagination__link"
                aria-current={item === page ? "page" : undefined}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            </li>
          ),
        )}

        <li className="govuk-pagination__item govuk-pagination__item--next">
          <button
            type="button"
            className="govuk-link govuk-pagination__link"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
          >
            {">"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
