import { Router } from "express";
import {
  deleteContactQuery,
  getContactQueryById,
  listContactQueries,
} from "../controllers/adminContactController";
import { requireAdminAuth } from "../middlewares/authMiddleware";

const adminContactRoutes = Router();

adminContactRoutes.get("/admin/contacts", requireAdminAuth, listContactQueries);
adminContactRoutes.get(
  "/admin/contacts/:id",
  requireAdminAuth,
  getContactQueryById,
);
adminContactRoutes.delete(
  "/admin/contacts/:id",
  requireAdminAuth,
  deleteContactQuery,
);

export { adminContactRoutes };
