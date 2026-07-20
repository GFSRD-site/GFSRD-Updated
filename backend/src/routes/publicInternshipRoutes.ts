import { Router } from "express";
import { createInternshipApplication } from "../controllers/publicInternshipController";

const publicInternshipRoutes = Router();

publicInternshipRoutes.post("/internships", createInternshipApplication);

export { publicInternshipRoutes };
