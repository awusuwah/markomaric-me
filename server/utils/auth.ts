import crypto from "crypto";
import jwt from "jsonwebtoken";
import { type H3Event } from "h3";

export const createToken = (event: H3Event, user: DatabaseUser) => {
  const config = useRuntimeConfig(event);
  const authSecret = config.authSecret;
  if (!authSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: "Auth secret is not set",
    });
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const token = jwt.sign(
    {
      // Registered claims
      iss: "https://markomaric.me", // Issuer - Which application is issuing the token
      sub: user.id, // Subject - The unique identifier of the user
      aud: "https://markomaric.me", // Audience - The intended recipient of the token
      exp: currentTimestamp + 2 * 24 * 60 * 60, // Expiration time - The time after which the token will no longer work (2 days)
      nbf: currentTimestamp - 30, // Not before - The time from which the token is considered valid (-30 seconds to allow for clock skew)
      iat: currentTimestamp, // Issued at - The time at which the token was issued
      jti: crypto.randomUUID(), // JWT ID - A unique identifier for the token. Can be used to invalidate the token.
      typ: "JWT", // Token type - The kind of token it is (JWT, OAuth, etc.)

      // Public claims
      name: `${user.firstname} ${user.lastname}`,
      given_name: user.firstname,
      family_name: user.lastname,
      username: user.username,
      email: user.email,
    },
    authSecret
  );

  return token;
};

export const verifyToken = (event: H3Event, token: string): AuthTokenPayload => {
  const config = useRuntimeConfig(event);
  const authSecret = config.authSecret;
  if (!authSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: "Auth secret is not set",
    });
  }

  const decoded = jwt.verify(token, authSecret) as AuthTokenPayload;

  // Validate the token against the claims. If any of the claims are invalid, throw an error.
  const issuerValid = decoded.iss === "https://markomaric.me";
  const audienceValid = decoded.aud === "https://markomaric.me";
  const expirationValid = decoded.exp >= Math.floor(Date.now() / 1000);
  const notBeforeValid = decoded.nbf <= Math.floor(Date.now() / 1000);
  if (!issuerValid || !audienceValid || !expirationValid || !notBeforeValid) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid token",
    });
  }

  return decoded;
};
