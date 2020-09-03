import App from "../src";
import "../src/env";
import request from "supertest";
import * as assert from "uvu/assert";
import "hard-rejection/register";
import { PrismaClient } from "@prisma/client";
import { suite } from "uvu";

console.log(process.env.TEST_DATABASE_URL);
const Users = suite("Notes API");

const testUser = {
	username: "John-doe",
	password: "drowssap",
	id: 1,
	admin:false,
	email: "jane@doe.com",
	about: "Adding a description to the test user for testing",
};

Users.before(async (context) => {
	try {
		context.prisma = new PrismaClient();
		App.locals.prisma = context.prisma;
		await context.prisma.$queryRaw("DELETE from notes");
		await context.prisma.$queryRaw("DELETE from users");
	} catch (err) {
		console.log(err);
	}
});

Users.after(async (context) => {
	await context.prisma.$queryRaw("DELETE from notes");
	await context.prisma.$queryRaw("DELETE from users");

	const notesCount = await context.prisma.notes.count();
	const usersCount = await context.prisma.users.count();
	assert.is(notesCount, 0);
	assert.is(usersCount, 0);
});

Users("New user endpoint", async (context) => {
	await request(App)
		.post("/users/create")
		.send(testUser)
		.set("Accept", "application/json")
		.expect("Content-Type", /json/)
		.then((res) => {
			assert.is(res.body.username, testUser.username);
			assert.is(res.body.password, testUser.password);
			assert.is(res.body.email, testUser.email);
			assert.is(res.body.about, testUser.about);
		});
});

Users("Create note to a specific User", async (context) => {
	const newNote = {
		title: "A Sample data",
		description: "Adding a description to the new note for the test",
		author: testUser.username,
	};
	await request(App)
		.post("/notes/create")
		.send(newNote)
		.set("Accept", "applcation/json")
		.expect("Content-Type", /json/)
		.then(async (response) => {
			await request(App)
				.get(`/users/${testUser.username}/notes`)
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.then((response) => {
					for (let i = 0; i < response.body.length - 1; i++) {
						assert.is(response.body[i], testUser.username);
					}
				});
		});
});

Users.run();
