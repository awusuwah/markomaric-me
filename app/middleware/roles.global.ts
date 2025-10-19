export default defineNuxtRouteMiddleware(async (to) => {
  const { execute, loading } = useApi();

  const need = to.meta.requiresRole as string | undefined;
  if (!need) return;

  // TODO: Check if the user has the required role.
  const { data, error, success } = await execute("/api/auth/me");
  console.log("Checking roles: ", { data, error, success });
  return;
});
