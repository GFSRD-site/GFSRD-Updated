import { Router } from "express";
import {
  adminDashboard,
  adminLogin,
  adminLogout,
} from "../controllers/adminAuthController";
import { requireAdminAuth } from "../middlewares/authMiddleware";

const adminAuthRoutes = Router();

adminAuthRoutes.post("/admin/login", adminLogin);
adminAuthRoutes.post("/admin/logout", requireAdminAuth, adminLogout);
adminAuthRoutes.get("/admin", requireAdminAuth, adminDashboard);

export { adminAuthRoutes };
