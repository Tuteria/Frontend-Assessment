// Module imports
import { NextApiRequest, NextApiResponse } from "next";
import DB from "../../../../db";

// Endpoint to CREATE NOTE
export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		// Check request method
		if (req.method !== "POST") throw new Error("Invalid request method")

		// Get request info
		const { description, title, ownerId } = req.body;

		// Check empty fields
		const emptyFields = [];
		if (!description) emptyFields.push("description");
		if (!title) emptyFields.push("title");
		if (!ownerId) emptyFields.push("owner");
		if (emptyFields.length > 0)
			throw new Error(`Your note requires a ${emptyFields[0]}`);

		// DB
		const db = await DB;

		// Check if user exists
		const user = await db.get(
			"SELECT * FROM users WHERE id=? LIMIT 1",
			ownerId
		);

		// Check if note already exists
		const note = await db.get(
			"SELECT * FROM notes WHERE title=? AND ownerId=? LIMIT 1",
			[title, ownerId]
		);

		// Validations before creating note
		if (!user) {
			throw new Error(`Do create an account first`);
		} else if (note) {
			throw new Error(`You already have a note with this title`);
		} else {
			await db.run(
				"INSERT INTO notes(title, description, ownerId) VALUES(?, ?, ?)",
				[title, description, ownerId]
			);

			res.json({
				data: null,
				message: `Your note titled ${title} was created successfully`,
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
};
