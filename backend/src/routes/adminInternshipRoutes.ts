import { Router } from "express";
import {
  deleteInternshipApplication,
  getInternshipApplicationById,
  listInternshipApplications,
} from "../controllers/adminInternshipController";
import { requireAdminAuth } from "../middlewares/authMiddleware";

const adminInternshipRoutes = Router();

adminInternshipRoutes.get(
  "/admin/internships",
  requireAdminAuth,
  listInternshipApplications,
);
adminInternshipRoutes.get(
  "/admin/internships/:id",
  requireAdminAuth,
  getInternshipApplicationById,
);
adminInternshipRoutes.delete(
  "/admin/internships/:id",
  requireAdminAuth,
  deleteInternshipApplication,
);

export { adminInternshipRoutes };
