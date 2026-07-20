import type { Request, Response } from "express";
import { prisma } from "../config/prisma";

const subscribeNewsletter = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body as { email?: string };

    if (!email?.trim()) {
      res.status(400).json({ success: false, message: "email is required" });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email: normalizedEmail },
      update: {},
      create: { email: normalizedEmail },
    });

    res.status(201).json({ success: true, data: subscriber });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to subscribe";
    res.status(500).json({ success: false, message });
  }
};

export { subscribeNewsletter };
