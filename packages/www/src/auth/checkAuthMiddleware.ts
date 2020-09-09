// require("dotenv").config();
// import { Response } from "express";

// import jwt from "jsonwebtoken";

const secret: string | string = process.env.SECRET || "secret";
// export const checkAuth = async (req: any, res: Response, next: any) => {
// 	try {
// 		const token = req.headers.authorization.split(" ")[1];
// 		const decoded = await jwt.verify(token, secret);
// 		req.userData = decoded;
// 		next();
// 	} catch (error) {
// 		return res.status(401).json({
// 			message: "Auth failed",
// 		});
// 	}
// };

import { verify } from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const authenticated = (fn: NextApiHandler) => async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	verify(req.cookies.auth!, secret, async function (err, decoded) {
		if (!err && decoded) {
			return await fn(req, res);
		}

		res.status(401).json({ message: "Sorry you are not authenticated" });
	});
};
