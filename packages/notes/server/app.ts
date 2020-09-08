import express from "express";
import cookieParser from "cookie-parser";
import { notes } from "./routes";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api/notes", notes);

export default app;
