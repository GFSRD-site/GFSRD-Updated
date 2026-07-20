import type { Request, Response } from "express";
import { prisma } from "../config/prisma";

const listContactQueries = async (_req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await prisma.contactQuery.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch contacts";
    res.status(500).json({ success: false, message });
  }
};

const getContactQueryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid contact id" });
      return;
    }

    const contact = await prisma.contactQuery.findUnique({ where: { id } });
    if (!contact) {
      res.status(404).json({ success: false, message: "Contact query not found" });
      return;
    }

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch contact";
    res.status(500).json({ success: false, message });
  }
};

const deleteContactQuery = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).json({ success: false, message: "Invalid contact id" });
      return;
    }

    await prisma.contactQuery.delete({ where: { id } });
    res.status(200).json({ success: true, message: "Contact query deleted" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete contact";
    res.status(500).json({ success: false, message });
  }
};

export {
  deleteContactQuery,
  getContactQueryById,
  listContactQueries,
};
