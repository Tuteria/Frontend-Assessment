import express from "express";
import * as bodyParser from "body-parser";
import { logging as httpLogger } from "@tuteria/common/src/middleware";
import cors from "cors";

import notes from "./notes";
import users from "./users";

const app = express();
app.use(bodyParser.json());
app.use(httpLogger);
app.use(cors());

app.use("/notes", notes);
app.use("/users", users);

export default app;
