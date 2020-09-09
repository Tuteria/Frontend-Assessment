import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

// instantiate the prisma data layer
const prisma = new PrismaClient();

export const getNotes = async (req: Request, res: Response) => {
	try {
		const notes = await prisma.note.findMany({
			orderBy: [{ createdAt: "desc" }],
		});
		res.status(200).json(notes);
	} catch (error) {
		console.log(error);

		res.status(500).json();
	} finally {
		await prisma.$disconnect();
	}
};
