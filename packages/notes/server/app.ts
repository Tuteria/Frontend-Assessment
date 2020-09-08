import express from "express";
import { notes } from "./routes";

const app = express();
app.use(express.json());
app.use("/api/notes", notes);

export default app;
