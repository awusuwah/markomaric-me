export default defineEventHandler(async (event) => {
  const h = (k: string, v: string) => setHeader(event, k, v);

  h("X-Frame-Options", "DENY");
  h("X-Content-Type-Options", "nosniff");
  h("X-XSS-Protection", "0");
  h("Referrer-Policy", "strict-origin-when-cross-origin");
  h("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
});
