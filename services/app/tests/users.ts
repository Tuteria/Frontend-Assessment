import App from "../src";
import "../src/env";
import request from "supertest";
import * as assert from "uvu/assert";
import "hard-rejection/register";
import { PrismaClient } from "@prisma/client";
import { suite } from "uvu";

console.log(process.env.TEST_DATABASE_URL);
const Users = suite("Users API");

Users.before(async (context) => {
	// context.prisma = await beforeCallback();
	context.prisma = new PrismaClient();
	App.locals.prisma = context.prisma;
	await context.prisma.queryRaw("DELETE from notes;");
	await context.prisma.queryRaw("DELETE from users;");
});

Users.after(async (context) => {
	await context.prisma.queryRaw("DELETE from notes;");
	const count = await context.prisma.notes.count();
	assert.is(count, 0);
});

Users("Create endpoint works as expected", async (context) => {
	await request(App)
		.post("/users/create")
		.send({
			username: "username",
			bio: "This is a sample description",
			email: "test@email.com",
			password: "password",
		})
		.set("Accept", "application/json")
		.expect("Content-Type", /json/)
		.then((response) => {
			assert.is(response.body.username, "username");
		});
});

Users("Get endpoint works as expected", async (context) => {
	const user = {
		username: "username",
		bio: "This is a sample description",
		email: "test@email.com",
		password: "password",
	};
	const note = {
		title: "Sample Update Note",
		username: user.username,
		description: "This is a sample update note description",
	};
	// Creates the note
	await request(App)
		.post("/notes/create")
		.send(note)
		.set("Accept", "application/json")
		.expect("Content-Type", /json/);

	// Creates the note
	await request(App)
		.post("/users/create")
		.send(user)
		.set("Accept", "application/json")
		.expect("Content-Type", /json/);

	await request(App)
		.get(`/users/${user.username}/notes`)
		.set("Accept", "application/json")
		.expect("Content-Type", /json/)
		.then((response) => {
			assert.instance(response.body, Array);
			assert.is(response.body[0].username, user.username);
		});
});

Users.run();
