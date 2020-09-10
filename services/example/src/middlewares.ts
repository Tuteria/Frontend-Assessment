import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import "./env";

export async function authRequired(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const authorization = req.headers.authorization;
	const token = authorization?.split(" ")[1];
	if (!token) {
		return res.status(400).json({ message: "Missing authorization header" });
	}
	const decoded: any = jwt.verify(token, process.env.SECRET_KEY || "");
	const prisma: PrismaClient = req.app.locals.prisma;
	const user = await prisma.users.findOne({
		where: { username: decoded?.user?.username }
	});
	if (!user) {
		return res.status(400).json({ message: "Invalid credentials" });
	}
	req.user = {
		id: user.id,
		username: user?.username ?? "",
		is_admin: user?.is_admin ?? false
	};
	next();
}

export async function adminOnly(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (!req.user?.is_admin) {
		return res
			.status(401)
			.json({ message: "Only admins can access this endpoint" });
	}
	next();
}

export async function noteOr404(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const prisma: PrismaClient = req.app.locals.prisma;
	const id = Number.parseInt(req.params.noteId, 10);
	const note = await prisma.notes.findOne({ where: { id } });
	if (!note) {
		return res.status(404).json({ message: "Note does not exist" });
	}
	req.note = {
		...note
	};
	next();
}
