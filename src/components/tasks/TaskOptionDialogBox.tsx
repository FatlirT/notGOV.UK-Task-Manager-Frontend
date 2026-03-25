import { useState, type FormEvent } from "react";

export type Options = {
  titleClauses?: string[];
  descriptionClauses?: string[];
  status?: Set<"pending" | "in_progress" | "completed">;
  timeLeft?: Set<"overdue" | "close" | "enough">;
  sort?: {
    by: "title" | "description" | "due_datetime" | "status";
    direction: "asc" | "desc";
  };
};

interface TaskOptionsDialogBoxProps {
  onApply: (values: Options) => void;
  onClose: () => void;
}

function parseCommaSeparatedText(value: string): string[] | undefined {
  const clauses = value.split(",").map((part) => part.trim());

  return clauses.length > 0 ? clauses : undefined;
}

function toggleCheckboxValue<T extends string>(
  value: T,
  selectedValues: Set<T>,
  setter: React.Dispatch<React.SetStateAction<Set<T>>>,
) {
  setter(
    selectedValues.has(value)
      ? new Set([...selectedValues].filter((v) => v !== value))
      : new Set([...selectedValues, value]),
  );
}

export default function TaskOptionsDialogBox({
  onApply,
  onClose,
}: TaskOptionsDialogBoxProps) {
  const [titleClauses, setTitleClauses] = useState("");
  const [descriptionClauses, setDescriptionClauses] = useState("");
  const [status, setStatus] = useState<
    Set<"pending" | "in_progress" | "completed">
  >(new Set());
  const [timeLeft, setTimeLeft] = useState<Set<"overdue" | "close" | "enough">>(
    new Set(),
  );
  const [sortBy, setSortBy] = useState<
    "title" | "description" | "due_datetime" | "status" | ""
  >();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const options: Options = {};

    titleClauses &&
      (options.titleClauses = parseCommaSeparatedText(titleClauses));
    descriptionClauses &&
      (options.descriptionClauses =
        parseCommaSeparatedText(descriptionClauses));
    status.size > 0 && (options.status = status);
    timeLeft.size > 0 && (options.timeLeft = timeLeft);
    sortBy &&
      (options.sort = {
        by: sortBy,
        direction: sortDirection,
      });

    onApply(options);
  };

  const handleReset = () => {
    setTitleClauses("");
    setDescriptionClauses("");
    setStatus(new Set());
    setTimeLeft(new Set());
    setSortBy("");
    setSortDirection("asc");
  };

  return (
    <div className="fixed inset-0 z-30 overflow-y-auto bg-black/40 text-nowrap">
      <div className="min-h-full w-full sm:flex sm:items-center sm:justify-center sm:p-4">
        <form
          onSubmit={handleSubmit}
          role="dialog"
          aria-modal="true"
          aria-labelledby="task-options-dialog-title"
          className="flex min-h-screen w-full flex-col bg-white shadow-xl sm:min-h-0 sm:max-w-2xl sm:rounded-lg"
        >
          <div className="flex-1 p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
              <h2
                id="task-options-dialog-title"
                className="govuk-heading-m govuk-!-margin-bottom-0"
              >
                Options
              </h2>

              <button type="button" className="govuk-link" onClick={onClose}>
                Close
              </button>
            </div>

            <div className="mb-4">
              <label className="govuk-label" htmlFor="options-title-segment">
                Title contains
              </label>
              <input
                id="options-title-segment"
                className="govuk-input w-full"
                value={titleClauses}
                onChange={(e) => setTitleClauses(e.target.value)}
                placeholder="report, audit, sprint"
              />
            </div>

            <div className="mb-4">
              <label
                className="govuk-label"
                htmlFor="options-description-segment"
              >
                Description contains
              </label>
              <input
                id="options-description-segment"
                className="govuk-input w-full"
                value={descriptionClauses}
                onChange={(e) => setDescriptionClauses(e.target.value)}
                placeholder="deploy, backup, review"
              />
            </div>

            <div className="mb-6">
              <fieldset className="govuk-fieldset">
                <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                  Time left
                </legend>

                <div className="govuk-checkboxes govuk-checkboxes--small flex flex-wrap items-center gap-x-6 gap-y-3">
                  <div className="govuk-checkboxes__item mb-0">
                    <input
                      className="govuk-checkboxes__input"
                      id="time-overdue"
                      type="checkbox"
                      checked={timeLeft.has("overdue")}
                      onChange={() =>
                        toggleCheckboxValue("overdue", timeLeft, setTimeLeft)
                      }
                    />
                    <label
                      className="govuk-label govuk-checkboxes__label"
                      htmlFor="time-overdue"
                    >
                      Overdue
                    </label>
                  </div>

                  <div className="govuk-checkboxes__item mb-0">
                    <input
                      className="govuk-checkboxes__input"
                      id="time-close"
                      type="checkbox"
                      checked={timeLeft.has("close")}
                      onChange={() =>
                        toggleCheckboxValue("close", timeLeft, setTimeLeft)
                      }
                    />
                    <label
                      className="govuk-label govuk-checkboxes__label"
                      htmlFor="time-close"
                    >
                      Close
                    </label>
                  </div>

                  <div className="govuk-checkboxes__item mb-0">
                    <input
                      className="govuk-checkboxes__input"
                      id="time-enough"
                      type="checkbox"
                      checked={timeLeft.has("enough")}
                      onChange={() =>
                        toggleCheckboxValue("enough", timeLeft, setTimeLeft)
                      }
                    />
                    <label
                      className="govuk-label govuk-checkboxes__label"
                      htmlFor="time-enough"
                    >
                      Enough
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="mb-4">
              <fieldset className="govuk-fieldset">
                <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                  Status
                </legend>

                <div className="govuk-checkboxes govuk-checkboxes--small flex flex-wrap items-center gap-x-6 gap-y-3">
                  <div className="govuk-checkboxes__item mb-0">
                    <input
                      className="govuk-checkboxes__input"
                      id="status-pending"
                      type="checkbox"
                      checked={status.has("pending")}
                      onChange={() =>
                        toggleCheckboxValue("pending", status, setStatus)
                      }
                    />
                    <label
                      className="govuk-label govuk-checkboxes__label"
                      htmlFor="status-pending"
                    >
                      Pending
                    </label>
                  </div>

                  <div className="govuk-checkboxes__item mb-0">
                    <input
                      className="govuk-checkboxes__input"
                      id="status-in-progress"
                      type="checkbox"
                      checked={status.has("in_progress")}
                      onChange={() =>
                        toggleCheckboxValue("in_progress", status, setStatus)
                      }
                    />
                    <label
                      className="govuk-label govuk-checkboxes__label"
                      htmlFor="status-in-progress"
                    >
                      In progress
                    </label>
                  </div>

                  <div className="govuk-checkboxes__item mb-0">
                    <input
                      className="govuk-checkboxes__input"
                      id="status-completed"
                      type="checkbox"
                      checked={status.has("completed")}
                      onChange={() =>
                        toggleCheckboxValue("completed", status, setStatus)
                      }
                    />
                    <label
                      className="govuk-label govuk-checkboxes__label"
                      htmlFor="status-completed"
                    >
                      Completed
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="mb-4">
              <label className="govuk-label" htmlFor="sort-by">
                Sort by
              </label>
              <select
                id="sort-by"
                className="govuk-select w-full"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as
                      | "title"
                      | "description"
                      | "due_datetime"
                      | "status"
                      | "",
                  )
                }
              >
                <option value="">-- none --</option>
                <option value="title">Title</option>
                <option value="description">Description</option>
                <option value="due_datetime">Due date</option>
                <option value="status">Status</option>
              </select>
            </div>

            {sortBy && (
              <div className="mb-6">
                <fieldset className="govuk-fieldset">
                  <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                    Sort direction
                  </legend>

                  <div className="govuk-radios govuk-radios--small flex flex-wrap items-center gap-x-6 gap-y-3">
                    <div className="govuk-radios__item mb-0">
                      <input
                        className="govuk-radios__input"
                        id="sort-direction-asc"
                        name="sort-direction"
                        type="radio"
                        value="asc"
                        checked={sortDirection === "asc"}
                        onChange={() => setSortDirection("asc")}
                      />
                      <label
                        className="govuk-label govuk-radios__label"
                        htmlFor="sort-direction-asc"
                      >
                        Ascending
                      </label>
                    </div>

                    <div className="govuk-radios__item mb-0">
                      <input
                        className="govuk-radios__input"
                        id="sort-direction-desc"
                        name="sort-direction"
                        type="radio"
                        value="desc"
                        checked={sortDirection === "desc"}
                        onChange={() => setSortDirection("desc")}
                      />
                      <label
                        className="govuk-label govuk-radios__label"
                        htmlFor="sort-direction-desc"
                      >
                        Descending
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            )}
          </div>

          <div className="sticky bottom-0 border-t bg-white p-4 sm:p-6">
            <div className="flex flex-wrap justify-end gap-3">
              <button type="submit" className="govuk-button govuk-!-margin-0">
                Apply
              </button>
              <button
                type="button"
                className="govuk-button govuk-button--secondary govuk-!-margin-0"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
