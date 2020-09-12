import { Router } from "express";
import { createUser, getUsers, getUsersNotes } from "../controllers/users";

const router = Router();

router.get("/:username/notes", getUsersNotes);
router.route("/").get(getUsers).post(createUser);

export default router;
