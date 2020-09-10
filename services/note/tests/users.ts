import env from "../../../env.config";
import App from "../src";
// import "../src/env";
import request from "supertest";
import * as assert from "uvu/assert";
import "hard-rejection/register";
import { PrismaClient } from "@prisma/client";
import { suite } from "uvu";

console.log(env.TEST_DATABASE_URL);

const Users = suite("Users API");
const token = null;
Users.before(async (context) => {
	// context.prisma = await beforeCallback();
	context.prisma = new PrismaClient();
	App.locals.prisma = context.prisma;
	await context.prisma.$queryRaw('DELETE from "public"."User";');
});

Users.after(async (context) => {
	context.prisma = new PrismaClient();
	App.locals.prisma = context.prisma;
	await context.prisma.$queryRaw('DELETE from "public"."User";');
	const count = await context.prisma.user.count();
	console.log(count);

	assert.is(count, 0);
});

Users("Create endpoint works as expected", async (context) => {
	context.prisma = new PrismaClient();
	App.locals.prisma = context.prisma;
	await request(App)
		.post("/users")
		.send({
			username: "Sample Username",
			email: "test@email.com",
			password: "samplepassword",
		})
		.set("Accept", "application/json")
		.expect("Content-Type", /json/)
		.then((response) => {
			console.log(response.body);

			assert.is(response.body.username, "Sample Username");
		});
	const count = await context.prisma.user.count();
	assert.is(count, 1);
});

Users("Get endpoint works as expected", async () => {
	await request(App)
		.get("/users")
		.set("Authorization", `Bearer ${token}`)
		.set("Accept", "application/json")
		.expect("Content-Type", /json/)
		.then((response) => {
			const { status } = response;
			console.log(status);

			assert.is(status, 200);
		});
});

Users.run();
