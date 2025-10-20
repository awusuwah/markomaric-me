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

  // Hash the new password + update the user's password
  const hashedPassword = await hashPassword(validated.data.newPassword);
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: hashedPassword,
      passwordUpdatedAt: new Date(),
    },
  });

  // Create a new token for the user
  const authtoken = createToken(event, updatedUser);
  setCookie(event, "authtoken", authtoken, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 2, // 2 days
    path: "/",
    sameSite: "strict",
  });
});
