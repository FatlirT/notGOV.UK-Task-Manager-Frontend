const TaskView = ({ task }: any) => {
  const due = new Date(task.due_datetime);
  const now = new Date();
  const diffMs = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  // Helper for ordinal suffix
  const getOrdinal = (n: number) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Format date manually
  const formatted = (() => {
    const weekday = due.toLocaleString("en-UK", { weekday: "long" });
    const day = due.getDate();
    const month = due.toLocaleString("en-UK", { month: "long" });

    let hours = due.getHours();
    const minutes = due.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // convert 0 -> 12 for 12-hour format

    const minuteStr = minutes.toString().padStart(2, "0"); // keep leading zero on minutes

    return `${weekday}, ${day}${getOrdinal(
      day
    )} ${month}, ${hours}:${minuteStr} ${ampm}`;
  })();

  return (
    <div className="space-y-10">
      {/* Title */}
      <h1 className="govuk-heading-xl">{task.title}</h1>

      {/* Status Badge */}
      <div>
        <span
          className={`govuk-heading-s inline-block px-4 py-2 ${
            task.status === "pending"
              ? "bg-black/15 text-black/80"
              : task.status === "in_progress"
              ? "bg-amber-200 text-amber-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {task.status.replace("_", " ")}
        </span>
      </div>

      {/* Due DateTime */}
      {task.status !== "completed" && (
        <div>
          <span
            className={`govuk-heading-m ${
              diffDays <= 1
                ? "text-red-600"
                : diffDays <= 3
                ? "text-amber-600"
                : "text-green-600"
            }`}
          >
            {diffDays > 0
              ? `Due in ${diffDays} day${diffDays > 1 ? "s" : ""}`
              : "Past due!"}
          </span>

          <div className="govuk-body">on {formatted}</div>
        </div>
      )}

      {/* Divider */}
      <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--visible" />

      {/* Description */}
      <p className="govuk-body leading-relaxed whitespace-pre-wrap break-words">
        {task.description}
      </p>
    </div>
  );
};

export default TaskView;
