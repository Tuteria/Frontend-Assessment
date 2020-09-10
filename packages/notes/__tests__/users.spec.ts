import request from "supertest";
import session from "supertest-session";
import app from "../server/app";
import { prisma } from "../server/lib";

const userSession = session(app);
let username: string;
let id: number;

beforeAll(async () => {
	// create an admin user
	const user = await prisma.users.upsert({
		where: {
			username: "admin",
		},
		create: {
			username: "admin",
			password: "$2y$10$xXULhziSVdFjqiLYukEtMeWjOCR3auE5lMetM7dvriXjgMD4Dm46m",
			admin: true,
		},
		update: {},
	});
	id = user.id;
	username = user.username;
});

afterAll(async () => {
	await prisma.$queryRaw("DELETE FROM notes;");
	await prisma.$queryRaw("DELETE FROM users WHERE username = 'ghost';");
	await prisma.$disconnect();
});

describe("GET /api/users/:username/notes", () => {
	it("should return all notes created by the specified user", async () => {
		await prisma.$queryRaw(`
      INSERT INTO notes (title, description, author_id) VALUES
      ('I', 'Note one', ${id}),
      ('II', 'Note two', ${id}),
      ('III', 'Note three', ${id}),
      ('IV', 'Note four', ${id})
    ;`);
		const response = await request(app).get(`/api/users/${username}/notes`);
		expect(response.status).toBe(200);
		expect(response.body.length).toBe(4);
		response.body.forEach(({ author_id }) => {
			expect(author_id).toBe(id);
		});
	});
});

describe("POST /api/users", () => {
	it("should allow admin to create new users", async () => {
		await userSession
			.post("/api/auth/login")
			.send({ username: "admin", password: "password" });
		const response = await userSession
			.post("/api/users")
			.send({ username: "ghost", password: "password" });
		const { username } = response.body;
		expect(response.status).toBe(201);
		expect(username).toBe("ghost");
	});

	it("should disallow duplicate usernames", async () => {
		const response = await userSession
			.post("/api/users")
			.send({ username: "ghost", password: "password" });
		const { message } = response.body;
		expect(response.status).toBe(400);
		expect(message).toBe("Username ghost is already taken.");
	});

	it("should restrict non admin users from creating users", async () => {
		const response = await request(app)
			.post("/api/users")
			.send({ username: "random", password: "password" });
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("message", "Only admin can create users.");
	});
});
