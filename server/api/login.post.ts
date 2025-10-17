import { z } from "zod";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const validated = requestSchema.safeParse(body);
  console.log(validated);
  if (!validated.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid credentials",
    });
  }

  // TODO: Replace mock logic with database checks
  if (validated.data.email !== "marko@markomaric.me" && validated.data.password !== "password") {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  }

  // TODO: Replace mock logic with actual token generation
  setCookie(event, "authtoken", "1234567890", {
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
  email: z.email(),
  password: z.string().min(10),
});
