// Node Modules
import knex from "knex"
import knexFile from "../../knexfile";

const nodeEnv = process.env.NODE_ENV || "development";

// DB setup
const db = knex(knexFile[nodeEnv]);

export default db;
