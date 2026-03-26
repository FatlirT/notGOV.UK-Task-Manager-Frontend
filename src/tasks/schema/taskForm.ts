import { z } from "zod";
import { TaskSchema } from "./task";

// Extend TaskSchema without due_datetime replace with date/time for the form
export const TaskFormSchema = TaskSchema.omit({
  due_datetime: true,
}).extend({
  due_date: z.string().min(1, "You must enter a due date."),
  due_time: z.string().min(1, "You must enter a due time."),
});

export type TaskFormValues = z.infer<typeof TaskFormSchema>;
