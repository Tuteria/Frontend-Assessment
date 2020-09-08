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
		const user: any = await prisma.user.findOne({
			where: { email: body.email },
		});
		const { error } = LoginValidation(body);
		if (!user) {
			return { message: "email does not exists" };
		} else if (error) {
			const message = "Email or password is invalid";
			return { message };
		} else {
			const validUser = await bcrypt.compare(body.password, user.password);

			if (validUser) {
				// create and assign token
				const token = await issueTokens({
					id: user.id,
					username: user.username,
					email: user.email,
				});

				const loggedInUser = {
					email: user.email,
					password: user.password,
					username: user.username,
					token: token,
				};

				res.status(200).send({
					success: true,
					data: loggedInUser,
				});
			} else {
				res.status(500).json({ message: "Invalid email or password" });
			}
		}
	} catch (error) {
		res.status(500).json();
	} finally {
		await prisma.$disconnect();
	}
};
