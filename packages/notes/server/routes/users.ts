import { Router } from "express";
import { getUsersNotes } from "../controllers/users";

const router = Router();

router.get("/:username/notes", getUsersNotes);

export default router;
