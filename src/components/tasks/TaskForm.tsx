// ------------------------------
// TaskForm.tsx
// ------------------------------
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormSchema, TaskFormValues } from "../../schema/tasks/taskForm";
import { Task } from "../../schema/tasks/task";
import ErrorSummary, { ErrorItem } from "../ErrorSummary";

type Props = {
  liftTaskCreated: (task: Task) => void;
  formAction: (task: Task) => any;
  task?: Task;
};

const TaskForm = ({ liftTaskCreated, formAction, task }: Props) => {
  const [apiError, setApiError] = useState<ErrorItem | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitted },
    reset,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(TaskFormSchema),
    mode: "onBlur",
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || "pending",
      due_date: task
        ? new Date(task.due_datetime).toISOString().split("T")[0]
        : "",
      due_time: task
        ? new Date(task.due_datetime).toISOString().split("T")[1].slice(0, 5)
        : "",
    },
  });

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const onReset = () => {
    reset();
  };

  const onSubmit = async (data: TaskFormValues) => {
    setApiError(null); // clear previous API error

    const task: Task = {
      title: data.title,
      description: data.description,
      status: "pending",
      due_datetime: new Date(`${data.due_date}T${data.due_time}`).toISOString(),
    };

    try {
      const response = await formAction(task);
      liftTaskCreated(response);
      reset();
    } catch (err: any) {
      // If backend provides field info, set it on the specific input
      if (err.field) {
        setError(err.field as keyof TaskFormValues, {
          type: "server",
          message: err.message,
        });
      } else {
        // Generic error goes to the summary
        setApiError({ message: err.message });
      }
    }
  };

  // Combine Zod validation errors + API error
  const errorSummaryItems: ErrorItem[] = [
    ...Object.entries(errors).map(([field, e]) => ({
      message: e?.message!,
      fieldId: field,
    })),
    ...(apiError ? [{ message: apiError.message }] : []),
  ];

  return (
    <div className="w-full text-left">
      {/* Show summary only if submitted and errors exist */}
      {isSubmitted && errorSummaryItems.length > 0 && (
        <ErrorSummary errors={errorSummaryItems} />
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Title */}
        <div
          className={`govuk-form-group ${
            errors.title ? "govuk-form-group--error" : ""
          }`}
        >
          <label htmlFor="title" className="govuk-label font-bold">
            Title
          </label>
          {errors.title && (
            <p className="govuk-error-message">
              <span className="govuk-visually-hidden">Error:</span>
              {errors.title.message}
            </p>
          )}
          <input
            id="title"
            type="text"
            className={`govuk-input ${
              errors.title ? "govuk-input--error" : ""
            }`}
            {...register("title")}
          />
        </div>

        {/* Description */}
        <div
          className={`govuk-form-group ${
            errors.description ? "govuk-form-group--error" : ""
          }`}
        >
          <label htmlFor="description" className="govuk-label font-bold">
            Description
          </label>
          {errors.description && (
            <p className="govuk-error-message">
              <span className="govuk-visually-hidden">Error:</span>
              {errors.description.message}
            </p>
          )}
          <textarea
            id="description"
            rows={4}
            className={`govuk-textarea ${
              errors.description ? "govuk-input--error" : ""
            }`}
            {...register("description")}
          />
        </div>

        {task && (
          <div
            className={`govuk-form-group ${
              errors.status ? "govuk-form-group--error" : ""
            }`}
          >
            <fieldset className="govuk-fieldset">
              <legend className="govuk-fieldset__legend govuk-label font-bold">
                Status
              </legend>

              {errors.status && (
                <p className="govuk-error-message">
                  <span className="govuk-visually-hidden">Error:</span>
                  {errors.status.message}
                </p>
              )}

              <div className="govuk-radios--inline text-nowrap">
                {[
                  { value: "pending", label: "Pending" },
                  { value: "in_progress", label: "In progress" },
                  { value: "completed", label: "Completed" },
                ].map((status) => (
                  <div className="govuk-radios__item" key={status.value}>
                    <input
                      className="govuk-radios__input"
                      id={`status-${status.value}`}
                      type="radio"
                      value={status.value}
                      {...register("status")}
                    />
                    <label
                      className="govuk-label govuk-radios__label"
                      htmlFor={`status-${status.value}`}
                    >
                      {status.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {/* Due date & time */}
        <div
          className={`govuk-form-group ${
            errors.due_date || errors.due_time ? "govuk-form-group--error" : ""
          }`}
        >
          <label className="govuk-label font-bold">Due date & time</label>
          {(errors.due_date || errors.due_time) && (
            <p className="govuk-error-message">
              <span className="govuk-visually-hidden">Error:</span>
              You must enter a due date and time.
            </p>
          )}
          <div className="flex gap-4">
            <input
              id="due_date"
              type="date"
              min={getTomorrowDate()}
              className={`govuk-input w-full ${
                errors.due_date ? "govuk-input--error" : ""
              }`}
              {...register("due_date")}
            />
            <input
              id="due_time"
              type="time"
              className={`govuk-input w-full ${
                errors.due_time ? "govuk-input--error" : ""
              }`}
              {...register("due_time")}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="mt-12 w-full text-center flex flex-row gap-4">
          <div className="w-full text-right">
            <button type="submit" className="govuk-button">
              {task ? "Update Task" : "Create Task"}
            </button>
          </div>
          <div className="w-full text-left">
            <button
              className="govuk-button govuk-button--secondary"
              type="button"
              onClick={onReset}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
