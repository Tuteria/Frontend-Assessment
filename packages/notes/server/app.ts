import express from "express";
import cookieParser from "cookie-parser";
import middleware from "./middleware";
import { notes } from "./routes";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(middleware.authenticateRequest)
app.use("/api/notes", notes);

export default app;
