import { Router } from "express";
import { getReciters } from "../controllers/reciter.controller.js";

const router = Router();

router.get("/", getReciters);

export default router;
