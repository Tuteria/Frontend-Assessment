import express, { Router, Request, Response } from "express";
import { getNotes } from "./controllers/getNotes";
import { createNotes } from "./controllers/createNotes";
import { updateNote } from "./controllers/updateNote";
import { deleteNote } from "./controllers/deleteNote";

// create the router variable
const router: Router = express.Router();

// send a get request to the notes endpoint to list all notes
router.get("/", getNotes);

// Post route that creates notes
router.post("/", createNotes);

// put route that updates notes
router.put("/:id", updateNote);

// delete route that deletes notes
router.delete("/:id", deleteNote);

export default router;
