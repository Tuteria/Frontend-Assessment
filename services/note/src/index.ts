import express, { Application } from 'express';
import notesRouter from './router/notes/index'
import { logging as httpLogger } from "@tuteria/common/src/middleware";
// initialize the app
const app: Application = express();

// middlewares
app.use(express.json())  // express json middleware
app.use(httpLogger);

// router middleware for the notes route
app.use("/notes", notesRouter)

export default app;