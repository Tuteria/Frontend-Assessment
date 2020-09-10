import env from "../../../env.config";
import App from "../src";
// import "../src/env";
import request from "supertest";
import * as assert from "uvu/assert";
import "hard-rejection/register";
import { PrismaClient } from "@prisma/client";
import { suite } from "uvu";

console.log(env.TEST_DATABASE_URL);

const Notes = suite("Notes API");
const token = null;
Notes.before(async (context) => {
	// context.prisma = await beforeCallback();
	context.prisma = new PrismaClient();
	App.locals.prisma = context.prisma;
	await context.prisma.$queryRaw('DELETE from "public"."Note";');
});

Notes.after(async (context) => {
	context.prisma = new PrismaClient();
	App.locals.prisma = context.prisma;
	await context.prisma.$queryRaw('DELETE from "public"."Note";');
	const count = await context.prisma.note.count();
	console.log(count);

	assert.is(count, 0);
});

Notes("Create endpoint works as expected", async (context) => {
	context.prisma = new PrismaClient();
	App.locals.prisma = context.prisma;
	await request(App)
		.post("/notes")
		.send({
			title: "Sample notes",
			body: "This is a sample description",
		})
		.set("Accept", "application/json")
		.expect("Content-Type", /json/)
		.then((response) => {
			console.log(response.body);

			assert.is(response.body.newNote.title, "Sample notes");
		});
	const count = await context.prisma.note.count();
	assert.is(count, 1);
});

Notes("Get endpoint works as expected", async () => {
	await request(App)
		.get("/notes")
		.set("Authorization", `Bearer ${token}`)
		.set("Accept", "application/json")
		.expect("Content-Type", /json/)
		.then((response) => {
			const { status } = response;
			console.log(status);

			assert.is(status, 200);
		});
});

Notes.run();
