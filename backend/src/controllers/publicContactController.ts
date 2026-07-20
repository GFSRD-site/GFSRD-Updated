import type { Request, Response } from "express";
import { prisma } from "../config/prisma";

const createContactQuery = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message } = req.body as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      res.status(400).json({
        success: false,
        message: "name, email, and message are required",
      });
      return;
    }

    const contact = await prisma.contactQuery.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
      },
    });

    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to submit contact query";
    res.status(500).json({ success: false, message });
  }
};

export { createContactQuery };
