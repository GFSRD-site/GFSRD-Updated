import type { Role } from "@prisma/client";

type AuthAdmin = {
  id: number;
  email: string;
  role: Role;
  jti: string;
  exp?: number;
};

declare global {
  namespace Express {
    interface Request {
      admin?: AuthAdmin;
    }
  }
}

export {};
