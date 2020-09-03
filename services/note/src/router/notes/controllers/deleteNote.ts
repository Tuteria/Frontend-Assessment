import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bodyParser from "body-parser";

// instantiate the prisma data layer
const prisma = new PrismaClient();

export const deleteNote = async (req: Request, res: Response) => {
	const { params } = req;
	try {
		const note = await prisma.note.delete({
			where: { id: parseInt(params.id) },
		});
		res
			.status(200)
			.json({ message: "Note Deleted successfully", deletedNote: note });
	} catch (error) {
		res.status(500).json();
	} finally {
		await prisma.$disconnect();
	}
};
