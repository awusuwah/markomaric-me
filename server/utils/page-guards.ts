const PUBLIC_ROUTES = [
  /^\/$/,
  /^\/login/,
  /^\/register/,

  /^\/public\//,
  /^\/api\/_nuxt_icon/,
  /^\/api\/auth\/login$/,
  /^\/api\/auth\/register$/,
  /^\/api\/auth\/logout$/,
  /^\/_nuxt\//,
  /^\/favicon\.ico$/,
  /^\/robots\.txt$/,
];

const ADMIN_ROUTES = [/^\/admin(\/|$)/];

export const isPublicRoute = (path: string) => PUBLIC_ROUTES.some((rx) => rx.test(path));
export const isAdminRoute = (path: string) => ADMIN_ROUTES.some((rx) => rx.test(path));
