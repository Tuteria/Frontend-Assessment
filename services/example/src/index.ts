import express from "express";
import accounts from "./accounts";
import * as bodyParser from "body-parser";
import { logging as httpLogger } from "@gbozee/common/src/middleware";

const app = express();
app.use(bodyParser.json());
app.use(httpLogger);
app.use("/accounts", accounts);

export default app;
