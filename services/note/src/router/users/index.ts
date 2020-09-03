import express, { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getUsers } from "./controllers/getUsers";
import { getOneUser } from "./controllers/getOneUser";
import { getUserNotes } from "./controllers/getUserNote";
// create the router variable
const router: Router = express.Router();

// instantiate the prisma data layer
const prisma = new PrismaClient();

// send a get request to the user endpoint to list all users
router.get("/", getUsers);

// send a get request to the users endpoint to list one user by username
router.get("/:username", getOneUser);

// send a get request to the notes endpoint to get note by a user
router.get("/:username/notes", getUserNotes);

export default router;
