// Module imports
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";

// Endpoint to UPDATE A NOTE
export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		// Check request method
		if (!["PUT", "DELETE"].includes(req.method))
			throw new Error("Invalid request method");

		// Get request info
		const { description, title, owner } = req.body;
		const id = req.query["note-id"];

		// Check empty fields
		const emptyFields = [];
		if (!id) emptyFields.push("id");
		if (!description && req.method === "PUT") emptyFields.push("description");
		if (!title && req.method === "PUT") emptyFields.push("title");
		if (!owner) emptyFields.push("owner");
		if (emptyFields.length > 0)
			throw new Error(`Your note requires a ${emptyFields[0]}`);

		// Check if user exists
		const user = (await db("users").where({ username: owner }))[0];

		// Check if note belongs to user
		const note = (await db("notes").where({ id, owner }))[0];

		// Validations before creating note
		if (!user) {
			throw new Error(`Do create an account first`);
		} else if (!note) {
			throw new Error(`You don't own this note`);
		} else {
			const type = req.method === "PUT" ? "updated" : "deleted";

			const data =
				type === "updated"
					? await db("notes")
						.where({ id })
						.update({ title, description })
						.returning("*")
					: await db("notes").where({ id, owner }).delete().returning("*");

			// Response
			res.json({
				data,
				message: `Your note was ${type} successfully`,
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
