import { z } from "zod";

export const TaskSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." })
    .max(50, { message: "Title must be at most 50 characters long" }),

  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters long." })
    .max(500, { message: "Description must be at most 500 characters long." }),

  status: z.enum(["pending", "in_progress", "completed"]),

  due_datetime: z
    .string()
    .refine((value) => new Date(value).getTime() > Date.now() + 60_000, {
      message: "Due date must be in the future",
    })
    .refine(
      (value) => {
        const date = new Date(value);
        return (
          date.getSeconds() === 0 &&
          date.getMilliseconds() === 0 &&
          date.getMinutes() % 5 === 0
        );
      },
      { message: "Due date must be in 5-minute intervals" },
    ),
});

export type Task = z.infer<typeof TaskSchema>;
