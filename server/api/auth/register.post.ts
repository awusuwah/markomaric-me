import { hashPassword } from "@/../server/utils/auth.db";
import { prisma } from "@/../server/utils/db";
import { REGISTER_SCHEMA } from "@/schemas/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Validate the request body
  const validated = REGISTER_SCHEMA.safeParse(body);
  if (!validated.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid request",
    });
  }

  const hashedPassword = await hashPassword(validated.data.password);

  // Store the user in the database
  try {
    const user = await prisma.user.create({
      data: {
        firstname: validated.data.firstname,
        lastname: validated.data.lastname,
        username: validated.data.username,
        email: validated.data.email,
        passwordHash: hashedPassword,
      },
    });

    // Set the `authtoken` cookie
    const authtoken = createToken(event, user);
    setCookie(event, "authtoken", authtoken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 2, // 2 days
      path: "/",
      sameSite: "strict",
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      throw createError({ statusCode: 409, statusMessage: "Conflict", message: "Username or email already in use!" });
    }

    throw createError({ statusCode: 500, statusMessage: "Internal Server Error", message: "An error occured while creating the user." });
  }
});
