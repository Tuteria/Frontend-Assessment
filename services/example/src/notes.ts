import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { verifyJwt } from "./jwt";

const router = Router();

//creates a note
router.post("/create", verifyJwt, async (req: any, res) => {
	const authorId = req?.payload?.user_id;

	const prisma: PrismaClient = req.app.locals.prisma;
	const { description, title } = req.body;
	const result = await prisma.notes.create({
		data: { description, title, authorId },
	});
	res.status(200).json(result);
});

// gets all notes
router.get("/", async (req: any, res) => {
	try {
		const prisma: PrismaClient = req.app.locals.prisma;
		const result = await prisma.notes.findMany();
		res.status(200).json(result);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

//gets a note
router.get("/:id", async (req: any, res) => {
	try {
		const prisma: PrismaClient = req.app.locals.prisma;
		const result = await prisma.notes.findOne({
			where: {
				id: parseInt(req.params.id),
			},
		});
		if (result === null) {
			return res.send("");
		}

		res.status(200).json(result);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

//updates a note
router.put("/:id", verifyJwt, async (req: any, res) => {
	if (req.payload.user_id !== req.body.authorId) {
		return res.send("unauthorised");
	}
	try {
		const prisma: PrismaClient = req.app.locals.prisma;
		const { description, title } = req.body;
		await prisma.notes.update({
			where: {
				id: parseInt(req.params.id),
			},
			data: {
				description,
				title,
			},
		});
		res.status(200).send("note updated successfully");
	} catch (err) {
		res.status(500).send(err.message);
	}
});

//deletes a note
router.delete("/:id", async (req: any, res) => {
	try {
		const prisma: PrismaClient = req.app.locals.prisma;
		await prisma.notes.delete({
			where: {
				id: parseInt(req.params.id),
			},
		});
		res.status(200).send("note deleted successfully");
	} catch (err) {
		res.status(500).send(err.message);
	}
});

export default router;
