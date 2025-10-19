import { createToken } from "@/../server/utils/auth";
import { hashPassword, verifyPassword } from "@/../server/utils/auth.db";
import { RESET_PASSWORD_SCHEMA } from "@/schemas/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Validate the request body
  const validated = RESET_PASSWORD_SCHEMA.safeParse(body);
  if (!validated.success) {
    throw createError({
      statusCode: 400,
      message: "Invalid request",
    });
  }

  // Find the user in the database
  const user = await prisma.user.findUnique({ where: { id: event.context.user.id } });
  if (!user) throw createError({ statusCode: 401, message: "Unauthorized" });

  // Verify that the current password matches the hash
  const currentPasswordMatches = await verifyPassword(user.passwordHash, validated.data.currentPassword);
  if (!currentPasswordMatches) throw createError({ statusCode: 401, message: "Invalid current password" });

  // Hash the new password + createa the new token
  const hashedPassword = await hashPassword(validated.data.newPassword);
  const authtoken = createToken(event, user);
  setCookie(event, "authtoken-new", authtoken, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 2, // 2 days
    path: "/",
    sameSite: "strict",
  });
});
