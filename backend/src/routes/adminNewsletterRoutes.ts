import { Router } from "express";
import {
  addNewsletterSubscriber,
  deleteNewsletterSubscriber,
  listNewsletterSubscribers,
} from "../controllers/adminNewsletterController";
import { requireAdminAuth } from "../middlewares/authMiddleware";

const adminNewsletterRoutes = Router();

adminNewsletterRoutes.get(
  "/admin/newsletters",
  requireAdminAuth,
  listNewsletterSubscribers,
);
adminNewsletterRoutes.post(
  "/admin/newsletters",
  requireAdminAuth,
  addNewsletterSubscriber,
);
adminNewsletterRoutes.delete(
  "/admin/newsletters/:id",
  requireAdminAuth,
  deleteNewsletterSubscriber,
);

export { adminNewsletterRoutes };
