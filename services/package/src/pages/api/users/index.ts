// Module imports
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";

// Endpoint
export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		// Check request method
		if (req.method !== "GET") throw new Error("Invalid request method")

		// Get users
		const data = await db("users");

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
