import express from "express";
import notes from "./notes";
import * as bodyParser from "body-parser";
import { logging as httpLogger } from "@tuteria/common/src/middleware";

const app = express();
app.use(bodyParser.json());
app.use(httpLogger);

app.use("/notes", notes);

export default app;
