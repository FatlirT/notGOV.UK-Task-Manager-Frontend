import timeDelta from "../utils/timeDelta";
import toTitleCase from "../utils/toTitleCase";
import { useNavigate } from "react-router-dom";

type TaskTableProps = {
  tasks: any[];
  onTaskComplete: (taskTitle: string) => Promise<void>;
};

export default function TaskTable({ tasks, onTaskComplete }: TaskTableProps) {
  const navigate = useNavigate();
  return (
    <table className="govuk-table">
      <thead className="govuk-table__head">
        <tr className="govuk-table__row">
          <th className="govuk-table__header">Title</th>
          <th className="govuk-table__header">Description</th>
          <th className="govuk-table__header">Time left</th>
          <th className="govuk-table__header">Status</th>
          <th className="govuk-table__header" />
        </tr>
      </thead>

      <tbody className="govuk-table__body">
        {tasks.map((task) => (
          <tr
            key={task.title}
            onClick={() => navigate(`/tasks/${task.title}`)}
            className="govuk-table__row cursor-pointer hover:bg-gray-100"
          >
            <td className="govuk-table__cell govuk-!-font-weight-bold w-fit">
              {task.title}
            </td>

            <td className="govuk-table__cell w-2/5 ">{task.description}</td>

            <td className="govuk-table__cell w-fit">
              {task.status !== "in_progress"
                ? "—"
                : (() => {
                    const { value, unit } = timeDelta(task.due_datetime);
                    const abs = Math.abs(value);
                    const plural = abs !== 1 ? "s" : "";

                    if (value < 0) {
                      return (
                        <strong className="govuk-tag govuk-tag--red">
                          Overdue by <br />
                          {abs} {unit.slice(0, -1)}
                          {plural}
                        </strong>
                      );
                    }

                    return (
                      <strong
                        className={`govuk-tag ${
                          value > 3 ? "govuk-tag--green" : "govuk-tag--orange"
                        }`}
                      >
                        {abs} {unit.slice(0, -1)}
                        {plural} left
                      </strong>
                    );
                  })()}
            </td>

            <td className="govuk-table__cell w-fit">
              <strong
                className={`govuk-tag ${
                  task.status === "completed"
                    ? "govuk-tag--green"
                    : task.status === "in_progress"
                      ? "govuk-tag--blue"
                      : "govuk-tag--grey"
                }`}
              >
                {toTitleCase(task.status.replace("_", " "))}
              </strong>
            </td>

            <td className="govuk-table__cell">
              {task.status === "in_progress" && (
                <button
                  type="button"
                  className="govuk-button govuk-button--secondary govuk-!-margin-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTaskComplete(task.title);
                  }}
                  aria-label={`Mark ${task.title} as completed`}
                >
                  ✓
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
