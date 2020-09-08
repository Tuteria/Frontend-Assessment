import express from "express";
import cookieParser from "cookie-parser";
import middleware from "./middleware";
import { auth, notes, users } from "./routes";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(middleware.authenticateRequest);
app.use("/api/auth", auth);
app.use("/api/notes", notes);
app.use("/api/users", users);

export default app;
