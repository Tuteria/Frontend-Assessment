import express from "express";
import notes from "./notes";
import users from "./users";
import * as bodyParser from "body-parser";
import cors from "cors";
import { logging as httpLogger } from "@tuteria/common/src/middleware";

const app = express();
app.use(bodyParser.json());
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
