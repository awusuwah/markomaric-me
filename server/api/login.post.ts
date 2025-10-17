import { z } from "zod";
import { createToken, verifyToken } from "@/../server/utils/auth";
import { hashPassword } from "@/../server/utils/auth.db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const validated = requestSchema.safeParse(body);
  if (!validated.success) {
    throw createError({
      statusCode: 400,
      message: "Invalid request",
    });
  }

  // TODO: Replace mock logic with database checks
  if (validated.data.email !== "marko@markomaric.me" || validated.data.password !== "password123") {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "Invalid credentials",
    });
  }
  let user = USER_MOCK;
  console.log("Hashed password: ", await hashPassword(validated.data.password));

  // TODO: Replace mock logic with actual token generation
  const authtoken = createToken(event, user);
  const verifiedUser = verifyToken(event, authtoken);
  console.log("Verified user: ", verifiedUser);
  setCookie(event, "authtoken", authtoken, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 2, // 2 days
    path: "/",
    sameSite: "strict",
  });

  return {
    user: {
      id: "1",
      email: "marko@markomaric.me",
      firstname: "Marko",
      lastname: "Maric",
    },
  };
});

const requestSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(10, { message: "Too short (min 10 characters)" }),
});

// TODO: Remove after database integration
const USER_MOCK: DatabaseUser = {
  id: "1",
  fullname: "Marko Maric",
  firstname: "Marko",
  lastname: "Maric",
  username: "awusuwah",
  email: "marko@markomaric.me",
  emailVerified: true,
};

interface DatabaseUser {
  id: string;
  fullname: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  emailVerified: boolean;
}
