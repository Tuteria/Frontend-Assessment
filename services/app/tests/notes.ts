import App from "../src";
import "../src/env";
import request from "supertest";
import * as assert from "uvu/assert";
import "hard-rejection/register";
import { PrismaClient } from "@prisma/client";
import { suite } from "uvu";

console.log(process.env.TEST_DATABASE_URL);
const Notes = suite("Notes API");

Notes.before(async (context) => {
	// context.prisma = await beforeCallback();
	context.prisma = new PrismaClient();
	App.locals.prisma = context.prisma;
	await context.prisma.queryRaw("DELETE from notes;");
});

Notes.after(async (context) => {
	await context.prisma.queryRaw("DELETE from notes;");
	const count = await context.prisma.notes.count();
	assert.is(count, 0);
});

Notes("Create endpoint works as expected", async (context) => {
	await request(App)
		.post("/notes/create")
		.send({
			title: "Sample notes",
			description: "This is a sample description",
		})
		.set("Accept", "application/json")
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
		.set("Accept", "application/json")
		.expect("Content-Type", /json/)
		.then((response) => {
			assert.instance(response.body, Array);
		});
});

Notes("Create endpoint works as expected", async (context) => {
	const note = {
		title: "Sample Update Note",
		description: "This is a sample update note description",
	};
	// Creates the note
	const response = await request(App)
		.post("/notes/create")
		.send(note)
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
		.expect("Content-Type", /json/);
	assert.is(updateResponse.body.description, noteUpdate.description);
	assert.is(updateResponse.body.title, noteUpdate.title);
});

Notes.run();
