import App from "../src";
import "../src/env";
import request from "supertest";
import * as assert from "uvu/assert";
import "hard-rejection/register";
import { PrismaClient } from "@prisma/client";
import { suite } from "uvu";

console.log(process.env.TEST_DATABASE_URL);
const Users = suite("Users API");

const userData = {
	username: "1test",
	password: "test",
	email: "1test@email.com",
	bio: "1test@email.com",
};

let authToken: string = null;

Users.before(async (context) => {
	try {
		// context.prisma = await beforeCallback();
		context.prisma = new PrismaClient();
		App.locals.prisma = context.prisma;
		await context.prisma.$queryRaw("DELETE from notes;");
		await context.prisma.$queryRaw("DELETE from users;");
		// Create a user
		await request(App)
			.post("/users/create")
			.send(userData)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.then((response) => {
				authToken = response.body.token;
			});
	} catch (error) {
		console.log(error);
	}
});

Users.after(async (context) => {
	await context.prisma.queryRaw("DELETE from notes;");
	await context.prisma.queryRaw("DELETE from users;");
	const notesCount = await context.prisma.notes.count();
	const usersCount = await context.prisma.users.count();
	assert.is(notesCount, 0);
	assert.is(usersCount, 0);
});

Users("Create endpoint works as expected", async (context) => {
	await request(App)
		.post("/users/create")
		.send({
			username: "usernamet",
			bio: "This is a sample description",
			email: "testt@email.com",
			password: "password",
		})
		.set("Accept", "application/json")
		.expect("Content-Type", /json/)
		.then((response) => {
			assert.is(response.body.username, "usernamet");
		});
});

Users("Login endpoint works as expected", async (context) => {
	await request(App)
		.post("/users/login")
		.send({
			username: "usernamet",
			bio: "This is a sample description",
			email: "testt@email.com",
			password: "password",
		})
		.set("Accept", "application/json")
		.expect("Content-Type", /json/);

	await request(App)
		.post("/users/login")
		.send({
			email: "testt@email.com",
			password: "password",
		})
		.set("Accept", "application/json")
		.expect("Content-Type", /json/)
		.then((response) => {
			console.log(response);
		});
});

Users("Get endpoint works as expected", async (context) => {
	const note = {
		title: "Sample Update Note",
		username: userData.username,
		description: "This is a sample update note description",
	};
	// Creates the note
	await request(App)
		.post("/notes/create")
		.send(note)
		.set("Authorization", `Bearer ${authToken}`)
		.set("Accept", "application/json")
		.expect("Content-Type", /json/);

	await request(App)
		.get(`/users/${userData.username}/notes`)
		.set("Accept", "application/json")
		.set("Authorization", `Bearer ${authToken}`)
		.expect("Content-Type", /json/)
		.then((response) => {
			assert.instance(response.body, Array);
			assert.is(response.body[0].username, userData.username);
		});
});

Users.run();
