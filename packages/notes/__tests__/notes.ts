import request from "supertest";
import app from "../server/app";
import { prisma } from "../server/lib";

afterAll((done) => {
	prisma.$disconnect().then(done).catch(done);
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
	it("should return a note with the matching id", async () => {
		const response = await request(app).get("/api/notes/1");
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id");
		expect(response.body).toHaveProperty("title");
		expect(response.body).toHaveProperty("description");
		expect(response.body).toHaveProperty("author_id");
	});

	it("should return {} if a note with the id does not exist", async () => {
		const response = await request(app).get("/api/notes/1000");
		expect(response.status).toBe(200);
		expect(response.body).toMatchObject({});
	});
})
