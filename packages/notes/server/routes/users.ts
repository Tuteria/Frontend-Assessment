import { Router } from "express";
import { getUsersNotes, loginOrRegister } from "../controllers/users";

const router = Router();

router.get("/:username/notes", getUsersNotes);
router.post("/login", loginOrRegister);

export default router;
