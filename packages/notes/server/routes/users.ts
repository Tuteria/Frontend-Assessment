import { Router } from "express";
import { createUser, getUsersNotes } from "../controllers/users";

const router = Router();

router.get("/:username/notes", getUsersNotes);
router.post("/", createUser);

export default router;
