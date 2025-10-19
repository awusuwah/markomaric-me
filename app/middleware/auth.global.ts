export default defineNuxtRouteMiddleware((to) => {
  const publicRoutes = ["/", "/login", "/register"];
  if (publicRoutes.includes(to.path)) return;
});
