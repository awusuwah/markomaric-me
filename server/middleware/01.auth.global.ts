import { getCookie, sendRedirect, type H3Event } from "h3";
import { verifyToken } from "@/../server/utils/auth";
import { prisma } from "@/../server/utils/db";

const PUBLIC_ROUTES = [
  /^\/$/,
  /^\/login/,
  /^\/register/,

  // Public assets
  /^\/public\//,
  // /^\/api\//,
  /^\/api\/auth\/login/,
  /^\/api\/auth\/register/,
  /^\/_nuxt\//,
  /^\/favicon\.ico$/,
  /^\/robots\.txt$/,
];

const isPublicRoute = (path: string) => PUBLIC_ROUTES.some((rx) => rx.test(path));

export default defineEventHandler(async (event: H3Event) => {
  const path = event.path || "/";

  // Quickly allow public routes/assets
  if (isPublicRoute(path)) return;

  // Check the auth token
  const authtoken = getCookie(event, "authtoken");
  if (!authtoken) {
    // For API calls, return a 401 Unauthorized error
    // For pages, redirect to the login page
    if (path.startsWith("/api/")) {
      console.warn("[01.auth.global] Unauthorized API call: ", path);
      throw createError({ statusCode: 401, statusMessage: "Unauthorized", message: "Unauthorized" });
    }

    return sendRedirect(event, `/login?next=${encodeURIComponent(path)}`, 302);
  }

  // Verify the token
  try {
    var payload = verifyToken(event, authtoken);
  } catch (error) {
    if (path.startsWith("/api/")) {
      throw createError({ statusCode: 401, statusMessage: "Unauthorized", message: "Unauthorized" });
    }

    return sendRedirect(event, `/login?next=${encodeURIComponent(path)}`, 302);
  }

  // Get the user from the database
  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, requiresPasswordReset: true, role: true },
  });

  if (!user) return handleAuthError(event, path);
  if (user.requiresPasswordReset && !/^\/(change-password|api\/change-password)/.test(path)) return handleAuthError(event, path);

  // Attach the user to the event
  event.context.user = { id: user.id, role: user.role, token: payload };
});

const handleAuthError = async (event: H3Event, path: string): Promise<void> => {
  if (path.startsWith("/api/")) throw createError({ statusCode: 401, statusMessage: "Unauthorized", message: "Unauthorized" });
  return sendRedirect(event, `/login?next=${encodeURIComponent(path)}`, 302);
};
