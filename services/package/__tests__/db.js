// Module require
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

const DB = sqlite.open({
	filename: "./mydb.sqlite",
	driver: sqlite3.Database,
});

module.exports = DB;
