import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { verifyAuth } from "@tuteria/common/src/middleware";

const router = Router();

// POST /notes/create Anonymous note creation
router.post("/create", verifyAuth(false), async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { description, title, username } = req.body;
	const result = await prisma.notes.create({
		data: { description, title, username },
	});
	res.status(200).json(result);
});

// GET /notes Fetching the list of anonymous notes created
router.get("/", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const result = await prisma.notes.findMany();
	res.status(200).json(result);
});

// GET /notes Fetching the list of anonymous notes created
router.get("/:nodeId", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const result = await prisma.notes.findOne({
		where: { id: parseInt(req.params.nodeId) },
	});
	res.status(200).json(result);
});

// PUT /notes/:note-id The ability to update a specific anonymous note
router.put("/:nodeId", verifyAuth(), async (req, res) => {
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
router.delete("/:nodeId", verifyAuth(), async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { description, title } = req.body;
	const result = await prisma.notes.delete({
		where: {
			id: parseInt(req.params.nodeId),
		},
	});
	res.status(200).json(result);
});

export default router;
