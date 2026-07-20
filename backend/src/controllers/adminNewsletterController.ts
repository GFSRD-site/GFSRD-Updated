import type { Request, Response } from "express";
import { prisma } from "../config/prisma";

const listNewsletterSubscribers = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ success: true, data: subscribers });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch subscribers";
    res.status(500).json({ success: false, message });
  }
};

const addNewsletterSubscriber = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email } = req.body as { email?: string };

    if (!email?.trim()) {
      res.status(400).json({ success: false, message: "email is required" });
      return;
    }

    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email: email.trim().toLowerCase() },
      update: {},
      create: { email: email.trim().toLowerCase() },
    });

    res.status(201).json({ success: true, data: subscriber });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to add subscriber";
    res.status(500).json({ success: false, message });
  }
};

const deleteNewsletterSubscriber = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid subscriber id" });
      return;
    }

    await prisma.newsletterSubscriber.delete({ where: { id } });

    res.status(200).json({ success: true, message: "Subscriber removed" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete subscriber";
    res.status(500).json({ success: false, message });
  }
};

export {
  addNewsletterSubscriber,
  deleteNewsletterSubscriber,
  listNewsletterSubscribers,
};
