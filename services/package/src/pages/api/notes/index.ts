// Module imports
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import runMiddleware from "../../../lib/middleware";

// Endpoint to GET ALL NOTES
export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		// Allowed Methods
		const validMethods = ["GET"];

		// MIDDLEWARE
		await runMiddleware(req, res, validMethods)

		// Check request method
		if (!validMethods.includes(req.method)) throw new Error("Invalid request method")

		// Get notes
		const data = await db("notes")

		res.json({
			data,
			message: `Notes fetched successfully`,
			error: false,
		});
	} catch (e) {
		res.status(400).json({
			data: null,
			message: e.message,
			error: true,
		});
	}
};
