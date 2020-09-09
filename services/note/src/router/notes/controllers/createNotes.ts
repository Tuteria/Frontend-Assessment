import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { NoteInterface } from "../../../../interfaces/noteInterface";

// instantiate the prisma data layer
const prisma = new PrismaClient();

export const createNotes = async (req: Request, res: Response) => {
	const body: NoteInterface = req.body;
	try {
		if (body.username) {
			const note = await prisma.note.create({
				data: {
					username: body.username,
					title: body.title,
					body: body.body,
				},
			});
			res
				.status(200)
				.json({ message: "Note created successfully", newNote: note });
		} else {
			const note = await prisma.note.create({
				data: {
					title: body.title,
					body: body.body,
				},
			});
			res
				.status(200)
				.json({ message: "Note created successfully", newNote: note });
		}
	} catch (error) {
		res.status(500).json();
	} finally {
		await prisma.$disconnect();
	}
};
