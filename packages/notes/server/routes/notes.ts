import { Router } from "express";
import { createNote, getNotes } from "../controllers/notes";

const router = Router();

router.route("/").get(getNotes).post(createNote);
export default router;
