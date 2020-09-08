import { NextFunction, Request, Response } from "express";
import { users as User } from "@prisma/client";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { prisma } from "../lib";
import { CustomRequest } from "../types";

const ADMIN_PATH = "/admin";

export default {
	authenticateRequest(req: CustomRequest, res: Response, next: NextFunction) {
		const { token } = req.cookies;
		if (!token) {
			if (req.path === ADMIN_PATH) res.redirect("/login");
			else {
				req.user = null;
				next();
			}
		} else {
			jwt.verify(
				token,
				process.env.JWT_SECRET,
				async (err: VerifyErrors, decoded) => {
					if (err) {
						if (req.path === ADMIN_PATH) res.redirect("/login");
						else {
							req.user = null;
							next();
						}
					} else {
						const user = await prisma.users.findOne({
							where: { id: decoded.id },
						});
						req.user = user;
						next();
					}
				}
			);
		}
	},
};
