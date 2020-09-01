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
	email: "jane@doe.com",
	desc: "Adding a description to the test user for testing",
};

const jwtToken: string = null;

// Users.before(async context => {
//   try{
//     context.prisma = new PrismaClient()
//     App.locals.prisma = context.prisma;
//     await context.prisma.$queryRaw("DELETE from notes")
//     await context.prisma.$queryRaw("DELETE from users")

//     await request(App).post("/users/create")
//                       .send(testUser)
//                       .set("Accept",'application/json')
//                       .expect("Content-Type",/json/).then(response => {
//                         jwtToken = response.body.token
//                       })
//   }catch(err){
//     console.log(err)
//   }
// })

Users.after(async (context) => {
	await context.prisma.$queryRaw("DELETE from notes");
	await context.prisma.$queryRaw("DELETE from users");

	const notesCount = await context.prisma.notes.count();
	const usersCount = await context.prisma.users.count();
	assert.is(notesCount, 0);
	assert.is(usersCount, 0);
});

Users("New user endpoint", async (context) => {
	const newUser = {
		username: "John-doe",
		password: "drowssap",
		email: "jane@doe.com",
		about: "Adding a description to the test user for testing",
	};

	await request(App)
		.post("/users/create")
		.send(newUser)
		.set("Accept", "application/json")
		.expect("Content-Type", /json/)
		.then((res) => {
			assert.is(res.body.username, newUser.username);
			assert.is(res.body.password, newUser.password);
			assert.is(res.body.email, newUser.email);
			assert.is(res.body.about, newUser.about);
		});
});

Users("Create note to a specific User", async (context) => {
	const newNote = {
		title: "A Sample data",
		description: "Adding a description to the new note for the test",
		author_id: testUser.id,
	};
	await request(App)
		.post("/notes/create")
		.send(newNote)
		.set("Authorization", `Bearer ${jwtToken}`)
		.set("Accept", "applcation/json")
		.expect("Content-Type", /json/)
		.then(async (response) => {
			await request(App)
				.get(`/users/${testUser.username}/notes`)
				.set("Accept", "application/json")
				.set("Authorization", `Bearer ${jwtToken}`)
				.expect("Content-Type", /json/)
				.then((response) => {
					for (let i = 0; i < response.body.length - 1; i++) {
						assert.is(response.body[i], testUser.username);
					}
				});
		});
});

Users("All Notes of a single user", async (context) => {});
