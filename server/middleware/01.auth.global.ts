import { type H3Event } from "h3";
import { checkAuthToken } from "@/../server/utils/auth.db";

export default defineEventHandler(async (event: H3Event) => {
  const path = event.path || "/";
  const user = await checkAuthToken(event, path);

  if (!user) return;

  // Attach the user to the event
  event.context.user = { id: user.id, role: user.role, token: user.token };
});
