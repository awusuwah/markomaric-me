export default defineEventHandler(async (event) => {
  console.log("Logging out the user");
  deleteCookie(event, "authtoken");

  return {
    success: true,
  };
});
