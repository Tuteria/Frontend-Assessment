import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import { NoteInterface } from "../../../../interfaces/noteInterface";

// instantiate the prisma data layer
const prisma = new PrismaClient();

export const updateNote = async (req: Request, res: Response) => {
	const body: NoteInterface = req.body;
	const { params } = req;
	try {
		const note = await prisma.note.update({
			where: { id: parseInt(params.id) },
			data: { ...body },
		});
		res
			.status(200)
			.json({ message: "Note Updated successfully", updatedNote: note });
	} catch (error) {
		res.status(500).json();
	} finally {
		await prisma.$disconnect();
	}
};
