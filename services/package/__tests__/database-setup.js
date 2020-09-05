async function setup() {
	const db = await require("./db").instance;

	await db.migrate({ force: "last" });

	const users = await db.all("SELECT * FROM users");
	console.log("ALL USERS", JSON.stringify(users, null, 2));

	const notes = await db.all("SELECT * FROM notes");
	console.log("ALL notes", JSON.stringify(notes, null, 2));
}

setup();
