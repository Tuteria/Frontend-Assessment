// Module imports
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";

// Endpoint to CREATE NOTE
export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		// Check request method
		if (req.method !== "POST") throw new Error("Invalid request method")

		// Get request info
		const { description, title, owner } = req.body;

		// Check empty fields
		const emptyFields = [];
		if (!description) emptyFields.push("description");
		if (!title) emptyFields.push("title");
		if (!owner) emptyFields.push("owner");
		if (emptyFields.length > 0)
			throw new Error(`Your note requires a ${emptyFields[0]}`);

		// Check if user exists
		const user = (await db("users").where({ username: owner }))[0];

		// Check if note already exists
		const note = (await db("notes").where({ title, owner }))[0]

		// Validations before creating note
		if (!user) {
			throw new Error(`Do create an account first`);
		} else if (note) {
			throw new Error(`You already have a note with this title`);
		} else {
			await db("notes").insert({ title, description, owner })

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
