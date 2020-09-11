import { Request, Response } from "express";
import { ValidationError } from "joi";
import bcrypt from "bcrypt";
import { prisma } from "../lib";
import { CustomRequest } from "../../types";
import { userSchema as schema } from "../schema";


export async function getUsersNotes(req: Request, res: Response) {
	const { username } = req.params;
	const notes = await prisma.notes.findMany({
		where: { author: { username } },
	});
	res.json(notes);
}


export async function createUser(req: CustomRequest, res: Response) {
	try {
		const { user } = req;
		if (!user || !user.admin) {
			res.status(400).json({ message: "Only admin can create users." });
		} else {
			const { username, admin, password } = await schema.validateAsync(
				req.body
			);
			const userAlreadyExists = await prisma.users.findOne({
				where: { username },
			});
			if (userAlreadyExists) {
				res
					.status(400)
					.json({ message: `Username ${username} is already taken.` });
			} else {
				const isAdmin = admin ? admin : false;
				const user = await prisma.users.create({
					data: {
						username,
						password: bcrypt.hashSync(password, 10),
						admin: isAdmin,
					},
					select: {
						id: true,
						username: true,
						admin: true,
					},
				});
				res.status(201).json(user);
			}
		}
	} catch (e) {
		if (e instanceof ValidationError) {
			res.status(400).json({ message: e.message });
		} else throw e;
	}
}
