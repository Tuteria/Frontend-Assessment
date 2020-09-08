import express, { Application } from "express";
import notesRouter from "./router/notes/index";
import usersRouter from "./router/users/index";
import { logging as httpLogger } from "@tuteria/common/src/middleware";
import cors from "cors";
// initialize the app
const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json()); // express json middleware
app.use(httpLogger);

// router middleware for the notes route
app.use("/notes", notesRouter);
app.use("/users", usersRouter);

export default app;
