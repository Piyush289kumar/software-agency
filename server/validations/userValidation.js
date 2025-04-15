import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email formate"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email formate"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
