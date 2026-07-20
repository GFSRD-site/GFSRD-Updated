import { type Request, type Response } from "express";
import { prisma } from "../config/prisma";

const getHealth = async (_req: Request, res: Response): Promise<void> => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      database: "connected",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown database error";

    res.status(500).json({
      success: false,
      database: "disconnected",
      error: message,
    });
  }
};

export { getHealth };
