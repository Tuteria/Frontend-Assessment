import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();

// POST /notes/create Anonymous note creation
router.post("/create", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { description, title } = req.body;
	const result = await prisma.notes.create({
		data: { description, title },
	});
	res.status(200).json(result);
});

// GET /notes Fetching the list of anonymous notes created
router.get("/", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const result = await prisma.notes.findMany();
	res.status(200).json(result);
});

// PUT /notes/:note-id The ability to update a specific anonymous note
router.put("/:nodeId", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { description, title } = req.body;
	const result = await prisma.notes.update({
		where: {
			id: parseInt(req.params.nodeId),
		},
		data: { description, title },
	});
	res.status(200).json(result);
});
// DELETE /notes/:note-id The ability to delete a specific anonymous note
// POST /users/create Endpoint to create a user
// GET /users/:username/notes Fetching the notes of a particular user

export default router;
