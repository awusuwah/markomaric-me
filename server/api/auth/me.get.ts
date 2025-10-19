import { prisma } from "@/../server/utils/db";
import { type H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  const user = event.context.user as { id: string; role: "USER" | "ADMIN"; token: AuthTokenPayload };
  if (!user) throw createError({ statusCode: 401, statusMessage: "Unauthorized", message: "Unauthorized" });

  // Return the user
  const me = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      firstname: true,
      lastname: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      lastLoginAt: true,
      role: true,
    },
  });

  if (!me) throw createError({ statusCode: 404 });
  return { user: me };
});
