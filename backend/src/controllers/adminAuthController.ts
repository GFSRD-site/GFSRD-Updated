import { randomUUID } from "node:crypto";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";
import { signAdminToken } from "../utils/jwt";

const adminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "email and password are required",
      });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.role !== "ADMIN") {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const token = signAdminToken({
      sub: String(user.id),
      email: user.email,
      role: "ADMIN",
      jti: randomUUID(),
    });

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    res.status(500).json({ success: false, message });
  }
};

const adminLogout = async (req: Request, res: Response): Promise<void> => {
  try {
    const admin = req.admin;
    if (!admin?.jti) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const expiresAt = admin.exp
      ? new Date(admin.exp * 1000)
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await prisma.revokedToken.upsert({
      where: { jti: admin.jti },
      create: {
        jti: admin.jti,
        expiresAt,
      },
      update: { expiresAt },
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Logout failed";
    res.status(500).json({ success: false, message });
  }
};

const adminDashboard = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [totalContacts, pendingContacts, totalSubscribers, totalInternships] =
      await Promise.all([
        prisma.contactQuery.count(),
        prisma.contactQuery.count({ where: { status: "PENDING" } }),
        prisma.newsletterSubscriber.count(),
        prisma.internshipApplication.count(),
      ]);

    res.status(200).json({
      success: true,
      data: {
        totalContacts,
        pendingContacts,
        totalSubscribers,
        totalInternships,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load dashboard";
    res.status(500).json({ success: false, message });
  }
};

export { adminDashboard, adminLogin, adminLogout };
