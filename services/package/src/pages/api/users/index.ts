// Module imports
import { NextApiRequest, NextApiResponse } from "next";
import DB from "../../../../db";

// Endpoint
export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		// Check request method
		if (req.method !== "GET") throw new Error("Invalid request method")

		// DB
		const db = await DB;

		// Get users
		const data = await db.all("SELECT * FROM users");

		res.json({
			data,
			message: `Users fetched successfully`,
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
