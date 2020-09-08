import { Router } from "express";
import { createNote, getNote, getNotes } from "../controllers/notes";

const router = Router();

router.route("/").get(getNotes).post(createNote);
router.route("/:id")
	.get(getNote);
export default router;
