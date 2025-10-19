import { z } from "zod";

export const LOGIN_SCHEMA = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Too short (min 8 characters)" }),
});

export const REGISTER_SCHEMA = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Too short (min 8 characters)" }),
});

export const RESET_PASSWORD_SCHEMA = z.object({
  currentPassword: z.string().min(8, { message: "Too short (min 8 characters)" }),
  newPassword: z.string().min(8, { message: "Too short (min 8 characters)" }),
});
