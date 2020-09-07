// Update with your config settings.

const knex = {
	development: {
		client: "pg",
		debug: true,
		connection: {
			host: "ec2-52-71-85-210.compute-1.amazonaws.com",
			user: "smmuymuwdjdnwh",
			password:
				"d32a41d2a517936b68388f2236d12e4680a3ea6e6bd42bfebc70aa3cde7e358e",
			database: "dbekvrbcb0rauv",
			port: 5432,
			ssl: { rejectUnauthorized: false },
		},
		pool: {
			min: 0,
			max: 10,
		},
	},

	staging: {
		client: "postgresql",
		connection: {
			database: "my_db",
			user: "username",
			password: "password",
		},
		pool: {
			min: 0,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},

	production: {
		client: "pg",
		debug: true,
		connection: {
			host: "ec2-52-71-85-210.compute-1.amazonaws.com",
			user: "smmuymuwdjdnwh",
			password:
				"d32a41d2a517936b68388f2236d12e4680a3ea6e6bd42bfebc70aa3cde7e358e",
			database: "dbekvrbcb0rauv",
			port: 5432,
			ssl: { rejectUnauthorized: false },
		},
		pool: {
			min: 0,
			max: 10,
		},
	},
};

module.exports = knex;
