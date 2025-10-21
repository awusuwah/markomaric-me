import { checkUserRole } from "@/../server/utils/auth.db";

export default defineEventHandler(async (event) => {
  const path = event.path || "/";
  await checkUserRole(event, path);
});
