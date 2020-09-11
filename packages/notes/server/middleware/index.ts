import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib";
import { CustomRequest } from "../../types";

export default {
	async authenticateRequest(
		req: CustomRequest,
		res: Response,
		next: NextFunction
	) {
		const { token } = req.cookies;
		if (!token) req.user = null;
		else {
			try {
				const decoded = jwt.verify(token, process.env.JWT_SECRET);
				const user = await prisma.users.findOne({
					where: { id: decoded.id },
				});
				req.user = user;
			} catch (e) {
				req.user = null;
			}
		}
		next();
	},

	async verifyNoteOwnership(
		req: CustomRequest,
		res: Response,
		next: NextFunction
	) {
		const { id } = req.params;
		const note = await prisma.notes.findOne({ where: { id: +id } });
		if (!note.author_id) {
			next();
		} else {
			const user = req.user;
			if (!user || note.author_id !== user.id) {
				res
					.status(400)
					.json({ message: "This note can only be modified by its author." });
			} else next();
		}
	},
};
