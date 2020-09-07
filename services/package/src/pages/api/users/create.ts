// Module imports
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import runMiddleware from "../../../lib/middleware";

// Endpoint
export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		// Allowed Methods
		const validMethods = ["POST"];

		// MIDDLEWARE
		await runMiddleware(req, res, validMethods)

		// Check request method
		if (!validMethods.includes(req.method)) throw new Error("Invalid request method")

		// Get request info
		const { username, name } = req.body;

		// Check empty fields
		const emptyFields = [];
		if (!username) emptyFields.push("username");
		if (emptyFields.length > 0)
			throw new Error(`A ${emptyFields[0]} is required`);

		// Check if user exists
		const user = (await db("users").where({ username }))[0]

		// Validations before creating note
		if (user) {
			throw new Error(`A user with this username already exists`);
		} else {
			await db("users").insert({ name, username })

			res.json({
				data: null,
				message: `User created successfully`,
				error: false,
			});
		}
	} catch (e) {
		res.status(400).json({
			data: null,
			message: e.message,
			error: true,
		});
	}
}
