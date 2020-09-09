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
