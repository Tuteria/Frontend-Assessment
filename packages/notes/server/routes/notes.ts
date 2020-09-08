import { Router } from "express";
import middleware from "../middleware";
import {
	createNote,
	deleteNote,
	getNote,
	getNotes,
	updateNote,
} from "../controllers/notes";

const router = Router();

router.route("/").get(getNotes).post(createNote);
router
	.route("/:id")
	.delete(middleware.verifyNoteOwnership, deleteNote)
	.get(getNote)
	.put(middleware.verifyNoteOwnership, updateNote);

export default router;
