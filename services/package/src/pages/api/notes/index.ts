// Module imports
import { NextApiRequest, NextApiResponse } from "next";
import DB from "../../../../db";

// Endpoint to GET ALL NOTES
export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		// Check request method
		if (req.method !== "GET") throw new Error("Invalid request method")

		// DB
		const db = await DB;

		// Get notes
		const data = await db.all("SELECT * FROM notes");

		res.json({
			data,
			message: `Notes fetched successfully`,
			error: false,
		});
	} catch (e) {
		res.json({
			data: null,
			message: e.message,
			error: true,
		});
	}
};
