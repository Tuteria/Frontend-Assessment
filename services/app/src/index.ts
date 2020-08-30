import express from "express";
import users from "./users";
import notes from "./notes";
import * as bodyParser from "body-parser";
import { logging as httpLogger } from "@tuteria/common/src/middleware";
import cors from "cors";

const app = express();
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(bodyParser.json());
app.use(httpLogger);
app.use("/notes", notes);
app.use("/users", users);

export default app;
