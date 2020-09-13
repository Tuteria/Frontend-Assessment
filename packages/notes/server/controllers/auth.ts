import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { ValidationError } from "joi";
import jwt from "jsonwebtoken";
import { prisma } from "../lib";
import { userSchema as schema } from "../schema";

export async function loginOrRegister(req: Request, res: Response) {
	try {
		const { username, password } = await schema.validateAsync(req.body);
		const user = await prisma.users.findOne({
			where: { username },
		});
		if (user) {
			const isValidPassword = bcrypt.compareSync(password, user.password);
			if (isValidPassword) {
				
				const token = jwt.sign({ id: user.id } , process.env.JWT_SECRET, { expiresIn: '24h' });
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
			const token = jwt.sign({ id: newUser.id } , process.env.JWT_SECRET, { expiresIn: '24h' });
			res.cookie("token", token, { httpOnly: true }).json(newUser);
		}
	} catch (e) {
		if (e instanceof ValidationError) {
			res.status(400).json({ message: e.message });
		} else throw e;
	}
}

export function logout(req: Request, res: Response) {
	res.clearCookie("token").end();
}
