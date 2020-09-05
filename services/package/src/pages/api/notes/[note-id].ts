// Module imports
import { NextApiRequest, NextApiResponse } from "next";
import DB from "../../../../db";

// Endpoint to UPDATE A NOTE
export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		// Check request method
		if (!["PUT", "DELETE"].includes(req.method))
			throw new Error("Invalid request method");

		// Get request info
		const { description, title, ownerid } = req.body;
		const id = req.query["note-id"];

		// Check empty fields
		const emptyFields = [];
		if (!id) emptyFields.push("id");
		if (!description && req.method === "PUT") emptyFields.push("description");
		if (!title && req.method === "PUT") emptyFields.push("title");
		if (!ownerid) emptyFields.push("owner");
		if (emptyFields.length > 0)
			throw new Error(`Your note requires a ${emptyFields[0]}`);

		// DB
		const db = await DB.instance;

		// Check if user exists
		const user = await db.get(
			"SELECT * FROM users WHERE id=? LIMIT 1",
			ownerid
		);

		// Check if note belongs to user
		const note = await db.get(
			"SELECT * FROM notes WHERE id=?  AND ownerid = ? LIMIT 1",
			[id, ownerid]
		);

		// Validations before creating note
		if (!user) {
			throw new Error(`Do create an account first`);
		} else if (!note) {
			throw new Error(`You don't own this note`);
		} else {
			const type = req.method === "PUT" ? "updated" : "deleted";

			// If updating note
			if (type === "updated")
				await db.run(
					"UPDATE notes SET title = ?, description = ? WHERE id= ?",
					[title, description, id]
				);

			// If deleting note
			if (type === "deleted")
				await db.run("DELETE FROM notes WHERE id= ? AND ownerid=? ", [
					id,
					ownerid,
				]);

			// Response
			res.json({
				data: { id, title, description, ownerid },
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
