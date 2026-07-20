import { Router } from "express";
import { subscribeNewsletter } from "../controllers/publicNewsletterController";

const publicNewsletterRoutes = Router();

publicNewsletterRoutes.post("/newsletter/subscribe", subscribeNewsletter);

export { publicNewsletterRoutes };
