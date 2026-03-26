import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import getTask from "../api/getTask";
import updateTask from "../api/updateTask";
import { Task } from "../schema/task";
import TaskForm from "../components/TaskForm";
import TaskInformationSummary from "../components/TaskInformationSummary";
import TasksLayout from "../layout";

export default function TaskView() {
  const { title } = useParams<{ title: string }>();

  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      if (!title) {
        setError("Task title is missing.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const fetchedTask = await getTask(title);
        setTask(fetchedTask);
      } catch (err) {
        console.error("Failed to fetch task:", err);
        setError("Failed to load task.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [title]);

  const handleUpdateTask = async (updatedTask: Task) => {
    if (!title) {
      throw new Error("Task title is missing.");
    }

    const response = await updateTask(title, updatedTask);
    setTask(response);
    setIsEditing(false);
    return response;
  };

  return (
    <TasksLayout>
      <div className="w-full text-left">
        {!isEditing && (
          <Link to="/tasks" className="govuk-back-link">
            Back to tasks
          </Link>
        )}
      </div>

      <main className="govuk-main-wrapper">
        {isLoading && <p>Loading task...</p>}

        {error || !task ? (
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
              <p>{error || "Task not found."}</p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-3xl mx-auto">
            {isEditing ? (
              <>
                <h1 className="govuk-heading-l">Edit task</h1>

                <TaskForm
                  task={task || undefined}
                  formAction={handleUpdateTask}
                  liftTaskCreated={(updatedTask) => {
                    setTask(updatedTask);
                  }}
                />

                <button
                  type="button"
                  className="govuk-button govuk-button--secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <TaskInformationSummary task={task} />
                {task.status !== "completed" && (
                  <>
                    <hr className="govuk-section-break govuk-section-break--xl govuk-section-break--invisible" />

                    <button
                      type="button"
                      className="govuk-button govuk-!-margin-bottom-0"
                      onClick={() => {
                        setIsEditing(true);
                      }}
                    >
                      Edit Task
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </main>
    </TasksLayout>
  );
}
