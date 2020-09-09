import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { LoginUserInterface } from "../../../../interfaces/userInterface";
import { LoginValidation } from "./auth/validations";
import { issueTokens } from "./auth/issueTokens";

// instantiate the prisma data layer
const prisma = new PrismaClient();

export const loginUser = async (req: Request, res: Response) => {
	const { body }: { body: LoginUserInterface } = req;
	try {
		const result = await prisma.user.findMany({
			where: { email: body.email },
		});
		const user = result[0];

		const { error } = LoginValidation(body);
		if (!user) {
			res.status(400).json({ message: "Email doesn't exist" });
		} else if (error) {
			const message = "Email or password is invalid";
			res.status(400).json({ message: message });
		} else {
			const validUser = await bcrypt.compare(body.password, user.password);

			if (validUser) {
				// create and assign token
				const token = await issueTokens({
					id: user.id,
					username: user.username,
					email: user.email,
				});

				res.status(200).json({
					token: token,
					message: "User Logged in Successfully",
				});
			} else {
				res
					.status(500)
					.json({ token: "invalid", message: "Invalid email or password" });
			}
		}
	} catch (error) {
		res.status(500).json();
	} finally {
		await prisma.$disconnect();
	}
};
