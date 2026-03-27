import { z } from "zod";

export const UserSchema = z.object({
  email: z
    .email({ message: "Invalid email address." })
    .max(255, { message: "Email must be at most 255 characters long." }),

  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long." })
    .max(100, { message: "First name must be at most 100 characters long." }),

  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long." })
    .max(100, { message: "Last name must be at most 100 characters long." }),
});

export type User = z.infer<typeof UserSchema>;
