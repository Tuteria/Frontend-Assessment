import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

// instantiate the prisma data layer
const prisma = new PrismaClient();

export const getOneNote = async (req: Request, res: Response) => {
	const { params } = req;
	try {
		const note = await prisma.note.findOne({
			where: { id: parseInt(params.id) },
		});
		res.status(200).json(note);
	} catch (error) {
		res.status(500).json();
	} finally {
		await prisma.$disconnect();
	}
};
