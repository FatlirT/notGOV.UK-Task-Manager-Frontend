import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskInformationSummary from "../components/TaskInformationSummary";
import createTask from "../api/createTask";
import { Link, useNavigate } from "react-router-dom";
import { Task } from "../schema/task";
import TasksLayout from "../layout";

export default function TaskNew() {
  const [taskCreated, setTaskCreated] = useState(null as Task | null);
  const navigate = useNavigate();

  const liftTaskCreated = (task: Task) => {
    setTaskCreated(task);
  };

  return (
    <TasksLayout>
      <div className="w-full text-left">
        <Link to="/tasks" className="govuk-back-link">
          View all tasks
        </Link>
      </div>
      <div className="w-3/4 mx-auto px-4 py-8 text-center">
        <h1 className="govuk-heading-l">
          {taskCreated ? "Successfully Created" : "Create a new Task"}
        </h1>
        {taskCreated ? (
          <>
            <TaskInformationSummary task={taskCreated} />
            <button
              className="govuk-button"
              onClick={() => navigate(`/tasks/${taskCreated.title}`)}
            >
              View Task
            </button>
          </>
        ) : (
          <TaskForm formAction={createTask} liftTaskCreated={liftTaskCreated} />
        )}
      </div>
    </TasksLayout>
  );
}
