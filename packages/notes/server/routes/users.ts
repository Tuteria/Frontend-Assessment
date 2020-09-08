import { Router } from "express";
import { createUser, getUsersNotes, loginOrRegister } from "../controllers/users";

const router = Router();

router.get("/:username/notes", getUsersNotes);
router.post("/", createUser);
router.post("/login", loginOrRegister);

export default router;
