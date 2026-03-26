import { useEffect, useState } from "react";
import TaskFilterDialogBox from "../components/TaskOptionDialogBox";
import TaskTable from "../components/TaskTable";
import getTasksWithOptions from "../api/getTasksWithOptions";
import updateTaskComplete from "../api/updateTaskComplete";
import TaskOptionsSummary from "../components/TaskOptionsSummary";
import TasksLayout from "../layout";

interface TaskListProps {
  pageSize?: number;
}

export default function TaskList({ pageSize = 10 }: TaskListProps) {
  const [page, setPage] = useState(1);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [options, setOptions] = useState<any>({});
  const [tasks, setTasks] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);

      const tasksData = await getTasksWithOptions({
        page,
        pageSize,
        ...options,
      });

      setTasks(tasksData.tasks);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      setTasks([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Applied options:", options);
    void fetchTasks();
  }, [page, options]);

  const applyOptions = (selectedOptions?: any) => {
    setPage(1);
    setOptions(selectedOptions);
    setShowFilterDialog(false);
  };

  const setTaskComplete = async (taskTitle: string) => {
    try {
      await updateTaskComplete(taskTitle);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.title === taskTitle ? { ...task, status: "completed" } : task,
        ),
      );
    } catch (error) {
      console.error("Failed to update task status", error);
    }
  };

  return (
    <TasksLayout>
      <div className="mb-6 flex w-full items-end justify-between">
        <div>
          <h1 className="govuk-heading-l govuk-!-margin-bottom-1">Tasks</h1>
          <p className="govuk-body govuk-!-margin-bottom-0">
            Manage and track your tasks
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="govuk-button govuk-button--secondary govuk-!-margin-bottom-0"
            onClick={() => setShowFilterDialog(true)}
          >
            Filter tasks
          </button>

          <button
            type="button"
            className="govuk-button govuk-!-margin-bottom-0"
            onClick={() => {
              window.location.href = "/tasks/new";
            }}
          >
            Add new task
          </button>
        </div>
      </div>

      <TaskOptionsSummary options={options} onClearAll={applyOptions} />

      <TaskTable tasks={tasks} onTaskComplete={setTaskComplete} />

      {isLoading ? (
        <h1 className="w-full text-center govuk-label ">
          {" "}
          Checking for tasks...{" "}
        </h1>
      ) : (
        <>
          {tasks.length === 0 && (
            <h2 className="govuk-label w-full justify-center text-center">
              No tasks found
            </h2>
          )}
        </>
      )}

      {totalPages > 1 && "" /*pagination controls*/}

      {showFilterDialog && (
        <TaskFilterDialogBox
          onApply={applyOptions}
          onClose={() => setShowFilterDialog(false)}
        />
      )}
    </TasksLayout>
  );
}
