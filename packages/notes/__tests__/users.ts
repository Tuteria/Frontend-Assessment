import request from "supertest";
import session from "supertest-session";
import app from "../server/app";
import { prisma } from "../server/lib";

//const userSession = session(app);
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
			password: "password",
			admin: true,
		},
		update: {},
	});
	id = user.id;
	username = user.username;
});

afterAll(async () => {
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
