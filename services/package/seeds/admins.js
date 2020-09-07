exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("admins")
		.del()
		.then(function () {
			// Inserts seed entries
			return knex("admins").insert([
				{key: 'apple', hash: "$2a$10$VTKCpKZef2Rk6w/OqRlj/Ox9u600scc5UBDuB2JRVLNF/1gp4Bolq"},
				{key: 'google', hash: "$2a$10$7JEwW2VMIYGmg8Q/Iu6Bb.CDVj4pKtMGQXQdYatrHN6VIFG5izmIG"}
			]);
		});
};
