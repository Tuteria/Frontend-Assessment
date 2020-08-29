import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();

// POST /users/create Endpoint to create a user
router.post("/create", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { username, email, password, bio } = req.body;
	const result = await prisma.users.create({
		data: { username, email, password, bio },
	});
	res.status(200).json(result);
});

// GET /users/:username/notes Fetching the notes of a particular user
router.get("/:username/notes", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const result = await prisma.notes.findMany({
		where: {
			username: req.params.username,
		},
	});
	res.status(200).json(result);
});

export default router;
