import argon2 from "argon2";
import { verifyToken } from "@/../server/utils/auth";
import { isAdminRoute, isPublicRoute } from "@/../server/utils/page-guards";
import { type H3Event } from "h3";

export const hashPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16, // 64MB
    timeCost: 3, // ~200ms
    parallelism: 1, // Single thread
  });
};

export const verifyPassword = async (hash: string, password: string): Promise<boolean> => {
  return await argon2.verify(hash, password);
};

export const checkAuthToken = async (event: H3Event, path: string): Promise<{ id: string; role: "USER" | "ADMIN"; token: AuthTokenPayload } | void> => {
  if (isPublicRoute(path)) return;

  // Check if the auth token exists and get it's value
  const authtoken = getCookie(event, "authtoken");
  if (!authtoken) {
    // All API calls should be redirected to the login page
    return handleAuthError(event, path, "Cookie `authtoken` is missing");
  }

  // Verify the token
  try {
    var payload = verifyToken(event, authtoken);
  } catch (error) {
    return handleAuthError(event, path, "Cookie `authtoken` contains an invalid token");
  }

  // Get the user from the database
  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, role: true },
  });

  if (!user) return handleAuthError(event, path, "Cannot find user in the database");
  return { id: user.id, role: user.role, token: payload };
};

export const checkUserRole = async (event: H3Event, path: string): Promise<void> => {
  // Skip all api routes + all public routes
  if (path.startsWith("/api/") || isPublicRoute(path)) return;

  // Get the user from the event context
  const user = event.context.user as { id: string; role: "USER" | "ADMIN" } | undefined;
  if (!user && !isAdminRoute(path)) return sendRedirect(event, `/login?next=${encodeURIComponent(path)}`, 302);

  // Validate the user's role
  if (!user) return sendRedirect(event, `/login?next=${encodeURIComponent(path)}`, 302);
  if (user.role !== "ADMIN") throw createError({ statusCode: 403, message: "Forbidden" });
};

const handleAuthError = async (event: H3Event, path: string, message: string) => {
  if (path.startsWith("/api/")) throw createError({ statusCode: 401, message });
  return sendRedirect(event, `/login?next=${encodeURIComponent(path)}`, 302);
};
