import "hard-rejection/register";
import request from "supertest";
import { PrismaClient } from "@prisma/client";
import { suite, exec } from "uvu";

import App from "../src";
import "../src/env";
import * as assert from "uvu/assert";

console.log(process.env.TEST_DATABASE_URL);
const Notes = suite("Notes API");

Notes.before.each(async (context) => {
	// context.prisma = await beforeCallback();
	context.prisma = new PrismaClient();
	App.locals.prisma = context.prisma;
	await context.prisma.$queryRaw("DELETE from notes;");
});

Notes.after.each(async (context) => {
	await context.prisma.$queryRaw("DELETE from notes;");
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

Notes("Get all endpoint should work as expected", async (context) => {
	const note = {
		title: "sample note",
		description: "sample note description",
	};
	await context.prisma.notes.create({
		data: note,
	});
	await request(App)
		.get("/notes/")
		.set("Accept", "application/json")
		.expect("Content-Type", /json/)
		.then((response) => {
			assert.equal(response.body[0].title, note.title);
		});
	const count = await context.prisma.notes.count();
	assert.is(count, 1);
});

Notes.run();
