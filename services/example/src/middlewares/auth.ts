import jwt from "jsonwebtoken";

require("dotenv").config();

const key = process.env.SECRET_KEY || "this∂®ƒ†®coulud%3be%-real man";

const authenticate = {
	Verify: (req: any, res: any, next: any) => {
		const token = req.body.token || req.query.token || req.headers["x-token"];
		if (!token) {
			next();
		} else {
			jwt.verify(token, key, (err: any, decoded: any) => {
				if (err) {
					return res.status(403).send({
						error: "Token could not be authenticated",
					});
				}
				req.decoded = decoded;
				next();
			});
		}
	},
	isAdmin: (req: any, res: any, next: any) => {
		const token = req.body.token || req.query.token || req.headers["x-token"];
		if (!token) {
			return res.status(401).send({
				message: "Unauthorised User!",
			});
		} else {
			jwt.verify(token, key, (err: any, decoded: any) => {
				if (err) {
					return res.status(403).send({
						error: "Token could not be authenticated",
					});
				}
				if (decoded.role === "Admin") {
					req.decoded = decoded;
					next();
				} else {
					return res.status(403).send({
						error:
							"You are not authorized to perform this action! Pls contact admin.",
					});
				}
			});
		}
	},
};

export default authenticate;
