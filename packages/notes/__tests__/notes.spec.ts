import request from "supertest";
import session from "supertest-session";
import app from "../server/app";
import { prisma } from "../server/lib";

const userSession = session(app);

afterAll(async () => {
	await prisma.$executeRaw("DELETE FROM notes");
	await prisma.$disconnect();
});

describe("GET /api/notes", () => {
	it("should return a list of anonymously created notes", async () => {
		const response = await request(app).get("/api/notes");
		expect(response.status).toBe(200);
		expect(response.type).toBe("application/json");
		response.body.forEach(({ author_id }) => {
			expect(author_id).toBeNull();
		});
	});
});

describe("GET /api/notes/:id", () => {
	let note;
	it("should return a note with the matching id", async () => {
		note = await request(app)
			.post("/api/notes")
			.send({ title: "I", description: "Random words" });
		const response = await request(app).get(`/api/notes/${note.body.id}`);
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id");
		expect(response.body).toHaveProperty("title");
		expect(response.body).toHaveProperty("description");
		expect(response.body).toHaveProperty("author_id");
	});

	it("should return {} if a note with the id does not exist", async () => {
		const response = await request(app).get(`/api/notes/${+note.body.id + 1}`);
		expect(response.status).toBe(200);
		expect(response.body).toMatchObject({});
	});
});

describe("POST /api/notes", () => {
	it("should create an anonymous note if user is not logged in", async () => {
		const response = await request(app).post("/api/notes").send({
			title: "Sample post",
			description: "This is a sample post",
		});
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("title", "Sample post");
		expect(response.body).toHaveProperty(
			"description",
			"This is a sample post"
		);
	});

	it("should create a note with an author id if user is logged in", async () => {
		const user = await userSession
			.post("/api/auth/login")
			.send({ username: "malik", password: "password" });
		const response = await userSession
			.post("/api/notes")
			.send({ title: "I", description: "Yet another sample post" });
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("author_id", user.body.id);
	});

	it("should not create a note with malformed input", async () => {
		const response = await request(app)
			.post("/api/notes")
			.send({ title: 1, description: "Sample post" });
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("message", '"title" must be a string');
	});
});

describe("PUT /api/notes/:id", () => {
	it("should allows users to edit anonymous notes", async () => {
		const { id } = await prisma.notes.create({
			data: { title: "Note", description: "Random Note" },
		});
		const response = await request(app)
			.put(`/api/notes/${id}`)
			.send({ description: "This is still a random note" });
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", id);
		expect(response.body).toHaveProperty(
			"description",
			"This is still a random note"
		);
	});
	let noteId: number;
	it("should allow users to edit their own notes", async () => {
		const note = await userSession.post("/api/notes").send({
			title: "Author's note",
			description: "This is not an anonymous note",
		});
		noteId = note.body.id;
		const response = await userSession
			.put(`/api/notes/${noteId}`)
			.send({ title: "My note" });
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", noteId);
		expect(response.body).toHaveProperty("title", "My note");
	});

	it("should prevent a user from editing another user's note", async () => {
		const response = await request(app)
			.put(`/api/notes/${noteId}`)
			.send({ title: "sabotage" });
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty(
			"message",
			"This note can only be modified by its author."
		);
	});
});

describe("DELETE /api/notes/:id", () => {
	it("should allow users to delete anonymous notes", async () => {
		const note = await prisma.notes.create({
			data: {
				title: "Sample note",
				description: "This is a sample note",
			},
		});
		const response = await request(app).delete(`/api/notes/${note.id}`);
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", note.id);
		const deletedNote = await prisma.notes.findOne({ where: { id: note.id } });
		expect(deletedNote).toBeNull();
	});
	let noteId: number;
	it("should prevent a user from deleting another user's note", async () => {
		const note = await userSession
			.post("/api/notes/")
			.send({ title: "Note", description: "These titles are getting lazy." });
		noteId = note.body.id;
		const response = await request(app).delete(`/api/notes/${noteId}`);
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty(
			"message",
			"This note can only be modified by its author."
		);
	});

	it("should allow users to delete their own notes", async() => {
		const response = await userSession.delete(`/api/notes/${noteId}`);
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id", noteId);
		const deletedNote = await prisma.notes.findOne({ where: { id: noteId } });
		expect(deletedNote).toBeNull();
	});
});
