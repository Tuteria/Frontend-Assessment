// Module imports
import { NextApiRequest, NextApiResponse } from "next";
import DB from "../../../../db";

// Endpoint
export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		// Check request method
		if (req.method !== "POST") throw new Error("Invalid request method")

		// Get request info
		const { username, name } = req.body;

		// Check empty fields
		const emptyFields = [];
		if (!username) emptyFields.push("username");
		if (emptyFields.length > 0)
			throw new Error(`A ${emptyFields[0]} is required`);

		// DB
		const db = await DB.instance;

		// Check if user exists
		const user = await db.get(
			"SELECT * FROM users WHERE username=? LIMIT 1",
			username)

		// Validations before creating note
		if (user) {
			throw new Error(`A user with this username already exists`);
		} else {
			await db.run(
				"INSERT INTO users(name, username) VALUES(?, ?)",
				[name, username]
			);

			res.json({
				data: null,
				message: `User created successfully`,
				error: false,
			});
		}
	} catch (e) {
		res.json({
			data: null,
			message: e.message,
			error: true,
		});
	}
}
