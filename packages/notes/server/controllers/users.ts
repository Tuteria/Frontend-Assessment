import { Request, Response } from "express";
import Joi, { ValidationError } from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib";
import { CustomRequest } from "../types";

const schema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
	admin: Joi.boolean(),
});

export async function getUsersNotes(req: Request, res: Response) {
	const { username } = req.params;
	const notes = await prisma.notes.findMany({
		where: { author: { username } },
	});
	res.json(notes);
}

export async function loginOrRegister(req: Request, res: Response) {
	try {
		const { username, password } = await schema.validateAsync(req.body);
		const user = await prisma.users.findOne({
			where: { username },
		});
		if (user) {
			const isValidPassword = bcrypt.compareSync(password, user.password);
			if (isValidPassword) {
				const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
					expiresIn: "24h",
				});
				res
					.cookie("token", token, { httpOnly: true })
					.json({ ...user, password: undefined });
			} else res.status(400).json({ message: "Invalid login credentials" });
		} else {
			const newUser = await prisma.users.create({
				data: {
					username,
					password: bcrypt.hashSync(password, 10),
					admin: false,
				},
				select: {
					id: true,
					username: true,
					admin: true,
				},
			});
			const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
				expiresIn: "24h",
			});
			res.cookie("token", token, { httpOnly: true }).json(newUser);
		}
	} catch (e) {
		if (e instanceof ValidationError) {
			res.status(400).json({ message: e.message });
		} else throw e;
	}
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
