import express from "express";
import users from "./users";
import notes from "./notes";
import * as bodyParser from "body-parser";
import { logging as httpLogger } from "@tuteria/common/src/middleware";
import cors from "cors";

const app = express();
app.use(
	cors({
		origin: process.env.FRONTEND_BASE_URL,
		credentials: true,
	})
);
app.use(bodyParser.json());
app.use(httpLogger);
app.use("/notes", notes);
app.use("/users", users);

app.use((error: any, req: any, res: any, next: any) => {
	if (error) {
		return res.status(error.status || 500).json({
			error: error.message || "Something bad happened",
			stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
		});
	}
});

export default app;
