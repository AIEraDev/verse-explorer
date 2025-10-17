import { Router } from "express";
import { getChapters, getChapter, getVerses } from "../controllers/chapter.controller.js";

const router = Router();

router.get("/", getChapters);
router.get("/:chapterId", getChapter);
router.get("/:chapterId/verses", getVerses);

export default router;
