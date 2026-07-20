import jwt, { type SignOptions } from "jsonwebtoken";

type AdminTokenPayload = {
  sub: string;
  email: string;
  role: "ADMIN";
  jti: string;
};

const getJwtSecret = (): string => {
  return process.env.JWT_SECRET || "dev-secret-change-me";
};

const getJwtExpiry = (): SignOptions["expiresIn"] => {
  return (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "7d";
};

const signAdminToken = (payload: AdminTokenPayload): string => {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: getJwtExpiry() });
};

const verifyToken = (token: string): AdminTokenPayload & jwt.JwtPayload => {
  const decoded = jwt.verify(token, getJwtSecret());

  if (typeof decoded === "string") {
    throw new Error("Invalid token payload");
  }

  return decoded as AdminTokenPayload & jwt.JwtPayload;
};

export { signAdminToken, verifyToken };
