import { Router } from "express";
import { getTranslations, getTranslation } from "../controllers/translation.controller.js";

const router = Router();

router.get("/", getTranslations);
router.get("/:chapterId", getTranslation);

export default router;
