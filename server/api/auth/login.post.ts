import { createToken } from "@/../server/utils/auth";
import { verifyPassword } from "@/../server/utils/auth.db";
import { LOGIN_SCHEMA } from "@/schemas/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Validate the request body
  const validated = LOGIN_SCHEMA.safeParse(body);
  if (!validated.success) {
    throw createError({
      statusCode: 400,
      message: "Invalid request",
    });
  }

  // Find the user in the database
  const user = await prisma.user.findUnique({ where: { email: validated.data.email } });
  if (!user) throw createError({ statusCode: 401, statusMessage: "Unauthorized", message: "Invalid credentials" });

  // Verify that the password matches the hash
  const passwordMatches = await verifyPassword(user.passwordHash, validated.data.password);
  if (!passwordMatches) throw createError({ statusCode: 401, statusMessage: "Unauthorized", message: "Invalid credentials" });

  // Update the user's last login
  await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

  // Set the `authtoken` cookie
  const authtoken = createToken(event, user);
  setCookie(event, "authtoken", authtoken, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 2, // 2 days
    path: "/",
    sameSite: "strict",
  });

  // Return the user
  return {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    lastLoginAt: user.requiresPasswordReset,
    role: user.role,
  };
});
