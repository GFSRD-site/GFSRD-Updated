import type { Request, Response } from "express";
import { prisma } from "../config/prisma";

const createInternshipApplication = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, email, phone, location, education, experience, motivation } =
      req.body as {
        name?: string;
        email?: string;
        phone?: string;
        location?: string;
        education?: string;
        experience?: string;
        motivation?: string;
      };

    if (!name?.trim() || !email?.trim() || !phone?.trim() || !motivation?.trim()) {
      res.status(400).json({
        success: false,
        message: "name, email, phone, and motivation are required",
      });
      return;
    }

    const application = await prisma.internshipApplication.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        location: location?.trim() || null,
        education: education?.trim() || null,
        experience: experience?.trim() || null,
        motivation: motivation.trim(),
      },
    });

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to submit internship application";
    res.status(500).json({ success: false, message });
  }
};

export { createInternshipApplication };
