import type { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma";
import { verifyToken } from "../utils/jwt";

const requireAdminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const token = authHeader.slice(7).trim();
    const decoded = verifyToken(token);
    const tokenJti = decoded.jti;

    if (!tokenJti || decoded.role !== "ADMIN" || !decoded.sub) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const revoked = await prisma.revokedToken.findUnique({
      where: { jti: tokenJti },
    });

    if (revoked) {
      res.status(401).json({ success: false, message: "Token is revoked" });
      return;
    }

    req.admin = {
      id: Number(decoded.sub),
      email: decoded.email,
      role: decoded.role,
      jti: tokenJti,
      exp: decoded.exp,
    };

    next();
  } catch (_error) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export { requireAdminAuth };
