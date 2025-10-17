import { z } from "zod";
import { hashPassword } from "@/../server/utils/auth.db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Validate the request body
  const validated = requestSchema.safeParse(body);
  if (!validated.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid request",
    });
  }
});

const requestSchema = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(10, { message: "Password must be at least 10 characters long" }),
});
