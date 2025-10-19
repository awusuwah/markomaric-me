interface User {
  firstname: string;
  lastname: string | undefined;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date;
  role: "USER" | "ADMIN";
}

interface DatabaseUser {
  email: string;
  id: string;
  firstname: string;
  lastname: string | null;
  username: string;
  passwordHash: string;
  role: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  lastLoginAt: Date;
  passwordUpdatedAt: Date;
  requiresPasswordReset: boolean;
}

interface AuthTokenPayload {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  nbf: number;
  iat: number;
  jti: string;
  typ: "JWT";

  name: string;
  given_name: string;
  family_name: string;
  username: string;
  email: string;
}
