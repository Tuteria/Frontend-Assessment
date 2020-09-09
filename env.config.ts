const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

export default {
	TEST_DATABASE_URL: process.env.TEST_DATABASE_URL ?? "",
	DATABASE_URL: process.env.DATABASE_URL ?? "",
};
