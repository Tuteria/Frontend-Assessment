// Module imports
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import runMiddleware from "../../../lib/middleware";
import bcrypt from "bcryptjs";

// Endpoint to UPDATE A NOTE
export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		// Allowed Methods
		const validMethods = ["POST"];

		// MIDDLEWARE
		await runMiddleware(req, res, validMethods);

		// Check request method
		if (!validMethods.includes(req.method))
			throw new Error("Invalid request method");

		// Get request info
		const { hash, key } = req.body;

		// Check empty fields
		const emptyFields = [];
		if (!key) emptyFields.push("key");
		if (!hash) emptyFields.push("hash");
		if (emptyFields.length > 0)
			throw new Error(`${emptyFields[0]} is required`);

		// Bcrypt Hash
		const bcryptHash = bcrypt.hashSync(hash, bcrypt.genSaltSync(10));

		// Check if user exists
		const data = (await db("admins").where({ key }))[0];

		if (!bcrypt.compareSync(hash, data.hash)) throw new Error("Invalid login")


		// Response
		res.json({
			data,
			message: `Login successful`,
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
