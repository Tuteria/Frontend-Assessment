import express, { Router, Request, Response } from "express";
import { getUsers } from "./controllers/getUsers";
import { getOneUser } from "./controllers/getOneUser";
import { getUserNotes } from "./controllers/getUserNote";
import { createUser } from "./controllers/createUsers";
import { loginUser } from "./controllers/loginUser";
import { checkAuth } from "./controllers/auth/checkAuthMiddleware";
// create the router variable
const router: Router = express.Router();

// send a get request to the user endpoint to list all users
router.get("/", getUsers);

// send a get request to the users endpoint to list one user by username
router.get("/:username", getOneUser);

// send a get request to the notes endpoint to get note by a user
router.get("/:username/notes" /*, checkAuth*/, getUserNotes);

// send a post request to the notes endpoint to create a user
router.post("/", createUser);

// send a post request to the notes endpoint to create a user
router.post("/login", loginUser);

export default router;
