type TaskOptions = {
  titleClauses?: string[];
  descriptionClauses?: string[];
  status?: Array<"pending" | "in_progress" | "completed">;
  timeLeft?: Array<"overdue" | "close" | "enough">;
  sort?: {
    by: "title" | "description" | "due_datetime" | "status";
    direction: "asc" | "desc";
  };
};

interface TaskOptionsSummaryProps {
  options: TaskOptions;
  onClearAll: (formData: TaskOptions) => void;
}

export default function TaskOptionsSummary({
  options,
  onClearAll,
}: TaskOptionsSummaryProps) {
  const valueToLabelDictionary: Record<string, string> = {
    sort: "Sort",
    status: "Status",
    timeLeft: "Time left",
    titleClauses: "Title",
    title: "Title",
    description: "Description",
    due_datetime: "Due Date",
    descriptionClauses: "Description",
    pending: "Pending",
    completed: "Completed",
    in_progress: "In Progress",
    overdue: "Overdue",
    enough: "Enough",
    close: "Close",
  };

  const displayOptions: Record<string, string> = {};

  if (options.titleClauses) {
    displayOptions.titleClauses = options.titleClauses.join(", ");
  }

  if (options.descriptionClauses) {
    displayOptions.descriptionClauses = options.descriptionClauses.join(", ");
  }

  if (options.timeLeft) {
    displayOptions.timeLeft = Array.from(options.timeLeft)
      .map((value) => valueToLabelDictionary[value])
      .join(", ");
  }

  if (options.status) {
    displayOptions.status = Array.from(options.status)
      .map((value) => valueToLabelDictionary[value])
      .join(", ");
  }

  if (options.sort) {
    displayOptions.sort = `${valueToLabelDictionary[options.sort.by]} ${
      options.sort.direction === "asc" ? "(ascending)" : "(descending)"
    }`;
  }

  const appliedOptions = Object.entries(displayOptions);

  if (appliedOptions.length === 0) return null;

  return (
    <div className="mb-6 rounded border border-slate-200 p-4">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="govuk-heading-s govuk-!-margin-bottom-0">
          Applied options
        </h2>

        <button
          type="button"
          className="govuk-link"
          onClick={() => onClearAll({})}
        >
          Clear all options
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {appliedOptions.map(([name, value]) => (
          <span
            key={name}
            className="rounded-full border border-slate-300 px-3 py-1 text-sm"
          >
            {valueToLabelDictionary[name]}:{" "}
            <span className="font-bold">{value}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
