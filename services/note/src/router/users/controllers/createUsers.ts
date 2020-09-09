import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { RegisterUserInterface } from "../../../../interfaces/userInterface";
import { RegisterValidation } from "./auth/validations";
import { issueTokens } from "./auth/issueTokens";

// instantiate the prisma data layer
const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
	try {
		const { body }: { body: RegisterUserInterface } = req;
		// check if data is valid
		const { error } = RegisterValidation(body);

		// check if username exists
		const username = body.username;
		const matchedUsername = await prisma.user.findOne({
			where: { username: username },
		});

		// check if email exists
		const matchedEmail = await prisma.user.findOne({
			where: { email: body.email },
		});

		// hash password
		const password: string = await bcrypt.hash(body.password, 10);

		if (matchedUsername) {
			res
				.status(400)
				.json({ success: false, message: "Username already exists" });
		} else if (matchedEmail) {
			res.status(400).json({ success: false, message: "Email is taken" });
		} else if (error) {
			res
				.status(400)
				.json({ success: false, message: error.details[0].message });
		} else {
			const token = await issueTokens({
				username: body.username,
				email: body.email,
			});

			const result = await prisma.user.create({
				data: {
					username: body.username,
					email: body.email,
					password: password,
				},
			});
			res.status(200).json({ ...result, token: token });
		}
	} catch (error) {
		res.status(500).json();
	} finally {
		await prisma.$disconnect();
	}
};
