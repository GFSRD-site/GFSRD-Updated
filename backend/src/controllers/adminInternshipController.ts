import type { Request, Response } from "express";
import { prisma } from "../config/prisma";

const listInternshipApplications = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const applications = await prisma.internshipApplication.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch internship applications";
    res.status(500).json({ success: false, message });
  }
};

const getInternshipApplicationById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid application id" });
      return;
    }

    const application = await prisma.internshipApplication.findUnique({
      where: { id },
    });

    if (!application) {
      res.status(404).json({ success: false, message: "Application not found" });
      return;
    }

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch application";
    res.status(500).json({ success: false, message });
  }
};

const deleteInternshipApplication = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid application id" });
      return;
    }

    await prisma.internshipApplication.delete({ where: { id } });
    res.status(200).json({ success: true, message: "Application deleted" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete application";
    res.status(500).json({ success: false, message });
  }
};

export {
  deleteInternshipApplication,
  getInternshipApplicationById,
  listInternshipApplications,
};
