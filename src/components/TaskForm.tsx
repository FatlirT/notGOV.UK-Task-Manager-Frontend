import { useState } from "react";
import { createTask } from "../api/createTask";

const TaskForm = ({ liftTaskCreated }: any) => {
  const fields = [
    "id",
    "title",
    "description",
    "status",
    "due_date",
    "due_time",
  ];
  const [formData, setFormData] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((field) => [field, ""]))
  );
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]); // reset previous errors

    try {
      const due_datetime = new Date(
        `${formData.due_date}T${formData.due_time}`
      ).toISOString();
      const { due_date, due_time, ...rest } = formData;
      const payload = { ...rest, due_datetime, status: "pending" };

      const response = await createTask(payload);
      liftTaskCreated(response);

      // clear form after success
      setFormData(Object.fromEntries(fields.map((field) => [field, ""])));
    } catch (err: any) {
      // set errors to show in GOV.UK error summary
      setErrors([err.message || "Something went wrong"]);
    }
  };

  return (
    <div className="w-full">
      {/* GOV.UK Error Summary */}
      {errors.length > 0 && (
        <div
          className="govuk-error-summary text-left"
          data-module="govuk-error-summary"
        >
          <div role="alert">
            <h2 className="govuk-error-summary__title">There is a problem</h2>
            <div className="govuk-error-summary__body">
              <ul className="govuk-list govuk-error-summary__list">
                {errors.map((error, idx) => (
                  <li key={idx}>
                    <a href="#">{error}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 text-left">
        {/* Title */}
        <div>
          <label htmlFor="title" className="govuk-label">
            Title:
          </label>
          <input
            required
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="govuk-input"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="govuk-label">
            Description:
          </label>
          <textarea
            required
            id="description"
            rows={4}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="govuk-textarea"
          />
        </div>

        {/* Due Date & Time */}
        <div>
          <label className="govuk-label">Due Date & Time:</label>
          <div className="flex gap-4">
            <input
              required
              type="date"
              min={getTomorrowDate()}
              value={formData.due_date}
              onChange={(e) => handleChange("due_date", e.target.value)}
              className="govuk-input w-full"
            />
            <input
              required
              type="time"
              value={formData.due_time}
              onChange={(e) => handleChange("due_time", e.target.value)}
              className="govuk-input w-full"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="govuk-button">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
