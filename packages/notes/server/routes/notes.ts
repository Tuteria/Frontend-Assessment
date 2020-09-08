import { Router } from "express";
import middleware from "../middleware";
import {
	createNote,
	getNote,
	getNotes,
	updateNote,
} from "../controllers/notes";

const router = Router();

router.route("/").get(getNotes).post(createNote);
router.route("/:id")
.get(getNote)
.put(middleware.verifyNoteOwnership, updateNote);
export default router;
