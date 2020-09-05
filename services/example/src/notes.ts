import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();

router.post("/create", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { description, title, user } = req.body;

	try {
		const result = await prisma.notes.create({
			data: { description, title, user },
		});
		return res.status(201).json(result);
	} catch (e) {
		return res.status(500).json({
			error: "An error occured, pls try again later.",
		});
	}
});

router.get("/", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;

	try {
		const result = await prisma.notes.findMany({
			where: { user: null },
		});

		return res.status(200).json({ data: result });
	} catch (e) {
		return res.status(500).json({
			error: "An error occured, pls try again later.",
		});
	}
});

router.put("/:noteId", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { title, description, user } = req.body;
	const noteId = parseInt(req.params.noteId);

	try {
		const noteResult = await prisma.notes.findOne({ where: { id: noteId } });

		if (noteResult) {
			const result = await prisma.notes.update({
				where: { id: noteId },
				data: {
					title: title ? title : noteResult.title,
					description: description ? description : noteResult.description,
					user: user ? user : noteResult.user,
				},
			});

			return res.status(200).json({ data: result });
		} else {
			return res.status(404).json({ error: "Note not found!" });
		}
	} catch (e) {
		return res.status(500).json({
			error: "An error occured, pls try again later.",
			e,
		});
	}
});

router.delete("/:noteId", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { title, description, user } = req.body;
	const noteId = parseInt(req.params.noteId);

	try {
		const noteResult = await prisma.notes.findOne({ where: { id: noteId } });

		if (noteResult) {
			const result = await prisma.notes.delete({ where: { id: noteId } });

			return res
				.status(200)
				.json({ message: "Note deleted succesfully", data: result });
		} else {
			return res.status(404).json({ error: "Note not found!" });
		}
	} catch (e) {
		return res.status(500).json({
			error: "An error occured, pls try again later.",
			e,
		});
	}
});

export default router;
