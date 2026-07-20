import { Router } from "express";
import { createContactQuery } from "../controllers/publicContactController";

const publicContactRoutes = Router();

publicContactRoutes.post("/contact", createContactQuery);

export { publicContactRoutes };
