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
const prisma = new PrismaClient();

Notes.before(async () => {
	// context.prisma = await beforeCallback();

	await prisma.$queryRaw("DELETE from notes;");
});

Notes.after(async () => {
	await prisma.$queryRaw("DELETE from notes;");
	const count = await prisma.note.count();
	assert.is(count, 0);
});

Notes("Create endpoint works as expected", async () => {
	await request(App)
		.post("/notes")
		.send({
			title: "Sample notes",
			body: "This is a sample description",
		})
		.set("Accept", "application/json")
		.expect("Content-Type", /json/)
		.then((response) => {
			assert.is(response.body.title, "Sample notes");
		});
	const count = await prisma.note.count();
	assert.is(count, 1);
});

Notes("Get endpoint works as expected", async () => {
	await request(App)
		.get("/notes")
		.set("Accept", "application/json")
		.expect("Content-Type", /json/)
		.then((response) => {
			assert.instance(response.body, Array);
		});
});

Notes.run();
