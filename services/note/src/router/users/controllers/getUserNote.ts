import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

// instantiate the prisma data layer
const prisma = new PrismaClient();

export const getUserNotes = async (req: Request, res: Response) => {
	const { params } = req;
	try {
		const userNotes = await prisma.note.findMany({
			where: {
				username: params.username,
			},
		});
		res.status(200).json(userNotes);
	} catch (error) {
		res.status(500).json();
	} finally {
		await prisma.$disconnect();
	}
};
