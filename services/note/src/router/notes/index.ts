import express, { Router, Request, Response } from "express";
import { getNotes } from "./controllers/getNotes";
import { createNotes } from "./controllers/createNotes";

// create the router variable
const router: Router = express.Router();

// send a get request to the notes endpoint to list all notes
router.get("/", getNotes);

// Post route that creates notes
router.post("/", createNotes);

export default router;
