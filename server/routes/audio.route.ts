import { Router } from "express";
import { getAudio } from "../controllers/audio.controller.js";

const router = Router();

router.get("/:reciterId/:chapterId/:verseNumber", getAudio);

export default router;
