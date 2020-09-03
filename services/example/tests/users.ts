import App from "../src";
import "../src/env";
import request from "supertest";
import * as assert from "uvu/assert";
import "hard-rejection/register";
import { PrismaClient } from "@prisma/client";
import { suite } from "uvu";
import jwt from "jsonwebtoken"

console.log(process.env.TEST_DATABASE_URL);
const Users = suite("Notes API");

const testUser = {
	username: "John-doe",
	password: "drowssap",
	id: 1,
	admin:false,
	email: "john@doe.com",
	about: "Adding a description to the test user for testing",
};
const jwtSecret = process.env.jwtSecret || "noibsoabiibadilboibvsofnapsndfansdiin"
			
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


Users("Successful login user",async() => {
	const newTestUser = {
		username: "Jane-doe",
		password: "drowssap",
		id: 2,
		admin:false,
		email: "jane@doe.com",
		about: "Adding a description to the test user for testing",
	};
		const loginCredential = {
			email:newTestUser.email,
			password:newTestUser.password
		}
	
	await request(App)
		.post("/users/create")
		.send(newTestUser)
		.set("Accept", "application/json")
		.expect("Content-Type", /json/)
		.then(async (res) => {
			await request(App)
				.post("/users/login")
				.send(loginCredential)
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.then((res) => {
					const token = jwt.sign({admin:newTestUser.admin},jwtSecret,{expiresIn:60*60})
					assert.is(res.body.message,"Login Successful")
					assert.is(res.body.token,token)
					assert.is(res.body.user.username,newTestUser.username)
					assert.is(res.body.user.admin,newTestUser.admin)
					assert.is(res.body.user.email,newTestUser.email)
				});
		});
})


Users("Create a new Admin",async(context) => {
	await request(App)
				.put(`/users/${testUser.username}/admin`)
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.then((response) => {
					console.log("we are here dawg")
					console.log(response.body.data.admin,!testUser.admin)
					assert.is(response.body.data.username,testUser.username)
				})
})

Users("Create note to a specific User", async (context) => {
	const newNote = {
		title: "A Sample data",
		description: "Adding a description to the new note for the test",
		author: testUser.username,
	};
	await request(App)
		.post("/notes/create")
		.send(newNote)
		.set("Accept", "application/json")
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
