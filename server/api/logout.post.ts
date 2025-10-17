export default defineEventHandler(async (event) => {
  deleteCookie(event, "authtoken");

  return {
    success: true,
  };
});
