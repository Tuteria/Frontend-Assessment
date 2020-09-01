import App from "../src";
import "../src/env";
import request from "supertest";
import * as assert from "uvu/assert";
import "hard-rejection/register";
import { PrismaClient } from "@prisma/client";
import { suite, test } from "uvu";

console.log(process.env.TEST_DATABASE_URL);
const Notes = suite("Notes API");

const userData = {
	username: "test",
	password: "test",
	email: "test@email.com",
	bio: "test@email.com",
};

let authToken: string = null;

Notes.before(async (context) => {
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

Notes.after(async (context) => {
	await context.prisma.queryRaw("DELETE from notes;");
	await context.prisma.queryRaw("DELETE from users;");
	const notesCount = await context.prisma.notes.count();
	const usersCount = await context.prisma.users.count();
	assert.is(notesCount, 0);
	assert.is(usersCount, 0);
});

Notes("Create endpoint works as expected", async (context) => {
	await request(App)
		.post("/notes/create")
		.send({
			title: "Sample notes",
			description: "This is a sample description",
		})
		.set("Accept", "application/json")
		.set("Authorization", `Bearer ${authToken}`)
		.expect("Content-Type", /json/)
		.then((response) => {
			assert.is(response.body.title, "Sample notes");
		});
	const count = await context.prisma.notes.count();
	assert.is(count, 1);
});

Notes("Get endpoint works as expected", async (context) => {
	await request(App)
		.get("/notes")
		.set("Authorization", `Bearer ${authToken}`)
		.set("Accept", "application/json")
		.expect("Content-Type", /json/)
		.then((response) => {
			assert.instance(response.body, Array);
		});
});

Notes("Update endpoint works as expected", async (context) => {
	const note = {
		title: "Sample Update Note",
		description: "This is a sample update note description",
	};
	// Creates the note
	const response = await request(App)
		.post("/notes/create")
		.send(note)
		.set("Authorization", `Bearer ${authToken}`)
		.set("Accept", "application/json")
		.expect("Content-Type", /json/);

	assert.is(response.body.title, note.title);
	assert.ok(response.body.id);

	// Creates the note
	const noteUpdate = {
		title: "Sample Note Updated",
		description: "Description updated",
	};
	const updateResponse = await request(App)
		.put(`/notes/${response.body.id}`)
		.send(noteUpdate)
		.set("Accept", "application/json")
		.set("Authorization", `Bearer ${authToken}`)
		.expect("Content-Type", /json/);
	assert.is(updateResponse.body.description, noteUpdate.description);
	assert.is(updateResponse.body.title, noteUpdate.title);
});

Notes("Delete endpoint works as expected", async (context) => {
	const note = {
		title: "Sample Update Note",
		description: "This is a sample update note description",
	};
	// Creates the note
	const response = await request(App)
		.post("/notes/create")
		.send(note)
		.set("Accept", "application/json")
		.set("Authorization", `Bearer ${authToken}`)

		.expect("Content-Type", /json/);

	assert.is(response.body.title, note.title);
	assert.ok(response.body.id);

	// Creates the note
	const updateResponse = await request(App)
		.delete(`/notes/${response.body.id}`)
		.set("Accept", "application/json")
		.set("Authorization", `Bearer ${authToken}`)

		.expect("Content-Type", /json/);
	assert.is(updateResponse.body.description, note.description);
	assert.is(updateResponse.body.title, note.title);
});

Notes.run();
