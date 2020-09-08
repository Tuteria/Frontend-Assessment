import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { noteOr404 } from "./middlewares";
const router = Router();

router.post("/create", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { description, title, user_id } = req.body;
	const result = await prisma.notes.create({
		data: { description, title, user_id },
	});
	res.status(200).json(result);
});

router.get("/", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const notes = await prisma.notes.findMany({ where: { user_id: null } });
	res.status(200).json(notes);
});

router.get("/:noteId", noteOr404, async (req, res) => {
	return res.status(200).json(req.note);
});

router.put("/:noteId", noteOr404, async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { title, description } = req.body;
	const id = parseInt(req.params.noteId, 10);
	try {
		const updatedNote = await prisma.notes.update({
			where: { id },
			data: { title, description },
		});
		res.status(200).json(updatedNote);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Uh Uh! Something went wrong" });
	}
});

router.delete("/:noteId", noteOr404, async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const id = Number.parseInt(req.params.noteId, 10);
	try {
		await prisma.notes.delete({ where: { id } });
		res.status(204).send();
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Uh Uh! Something went wrong" });
	}
});

export default router;
