import { Request, Response } from "express";
import app from "../src/index";
import supertest from "supertest";

const request = supertest(app);

app.get("/test", async (req: Request, res: Response) => {
	res.json({ message: "pass!" });
});

it("Gets the test endpoint", async (done) => {
	// Sends GET Request to /test endpoint
	const res = await request.get("/test");

	// ...
	done();
});

it("gets the test endpoint", async (done) => {
	const response = await request.get("/test");

	expect(response.status).toBe(200);
	expect(response.body.message).toBe("pass!");
	done();
});
