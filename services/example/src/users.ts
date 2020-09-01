import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();

router.post("/create", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { username, email, password, about } = req.body;
	try {
		const newUser = await prisma.users.create({
			data: { username, email, password, about },
		});
		res.status(200).json(newUser);
	} catch (err) {
		return res.status(401).json({
			error: err.message || "Something Went Wrong",
		});
	}
});

router.get("/:username/notes", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { username } = req.params;
	console.log("This is the username id", username);
	try {
		const foundNotes = await prisma.notes.findMany({
			where: { author_id: Number(username) },
		});
		res.status(200).json(foundNotes);
	} catch (err) {
		console.log("there's an err", err);
		res.status(200).json({
			error: err.message || "Something Went Wrong",
		});
	}
});

export default router;
