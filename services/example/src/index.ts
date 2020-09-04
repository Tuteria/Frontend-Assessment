import express from "express";
import notes from "./notes";
import users from "./users";
import * as bodyParser from "body-parser";
// import { logging as httpLogger } from "@tuteria/common/src/middleware";
import populatDb from "./populate";


// Comment out for test
// populatDb([5,10]);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(httpLogger);
app.use("/notes", notes);
app.use("/users", users);

export default app;
