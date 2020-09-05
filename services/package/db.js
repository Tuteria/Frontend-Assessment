// Module require
const pgp = require("pg-promise")();

// const DB = pgp('postgres://smmuymuwdjdnwh:d32a41d2a517936b68388f2236d12e4680a3ea6e6bd42bfebc70aa3cde7e358e@ec2-52-71-85-210.compute-1.amazonaws.com:5432/dbekvrbcb0rauv')
// module.exports = DB;

// Use a symbol to store a global instance of a connection, and to access it from the singleton.
const DB_KEY = Symbol.for("MyApp.db");
const globalSymbols = Object.getOwnPropertySymbols(global);
const hasDb = globalSymbols.indexOf(DB_KEY) > -1;
if (!hasDb) {
	global[DB_KEY] = pgp(
		`pgp('postgres://smmuymuwdjdnwh:d32a41d2a517936b68388f2236d12e4680a3ea6e6bd42bfebc70aa3cde7e358e@ec2-52-71-85-210.compute-1.amazonaws.com:5432/dbekvrbcb0rauv')`
	);
}

// Create and freeze the singleton object so that it has an instance property.
const singleton = {};
Object.defineProperty(singleton, "instance", {
	get: function () {
		return global[DB_KEY];
	},
});
Object.freeze(singleton);

module.exports = singleton;
