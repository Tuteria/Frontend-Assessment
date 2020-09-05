import express from "express";
import notes from "./notes";
import users from "./users";
import cors from "cors";
import { logging as httpLogger } from "../../../packages/common/src/middleware";
// Err Msg: Cannot find module '@tuteria/common/src/middleware' or its corresponding type declarations.
// import { logging as httpLogger } from "@tuteria/common/src/middleware";

const app = express();
app.use(express.json());
app.use(httpLogger);
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use("/notes", notes);
app.use("/users", users);

export default app;
