import { Request, Response } from "express";
import Joi, { ValidationError } from "joi";
import { users as User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib";

const schema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
	admin: Joi.boolean()
});

export async function getUsersNotes(req: Request, res: Response) {
	const { username } = req.params;
	const notes = await prisma.notes.findMany({
		where: { author: { username } }
	});
	res.json(notes);
}

export async function loginOrRegister(req: Request, res: Response) {
	try {
		const { username, password } = await schema.validateAsync(req.body);
		const user: User | null = await prisma.users.findOne({
			where: { username }
		});
		if (user) {
			const isValidPassword = bcrypt.compareSync(password, user.password);
			if (isValidPassword) {
				const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
					expiresIn: "24h"
				});
				res.cookie("token", token, { httpOnly: true }).json(user);
			} else res.status(400).json({ message: "Password is incorrect" });
		} else {
			const newUser: User = await prisma.users.create({
				data: {
					username,
					password: bcrypt.hashSync(password, 10),
					admin: false
				}
			});
			const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
				expiresIn: "24h"
			});
			res.cookie("token", token, { httpOnly: true }).json(newUser);
		}
	} catch (e) {
		if (e instanceof ValidationError) {
			res.status(400).json({ message: e.message });
		} else throw e;
	}
}
