import { Router } from "express";
import { createNote } from "../controllers/notes";

const router = Router();

router.route("/").post(createNote);
export default router;
