require("dotenv").config();
import { Response } from "express";

import jwt from "jsonwebtoken";

const secret: string | string = process.env.SECRET || "secret";
export const checkAuth = async (req: any, res: Response, next: any) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decoded = await jwt.verify(token, secret);
		req.userData = decoded;
		next();
	} catch (error) {
		return res.status(401).json({
			message: "Auth failed",
		});
	}
};
