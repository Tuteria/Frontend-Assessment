import express, { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// create the router variable
const router: Router = express.Router();

// instantiate the prisma data layer
const prisma = new PrismaClient();

// send a get request to the notes endpoint to list all notes
router.get("/", async (req: Request, res: Response) => {
	try {
		const notes = await prisma.note.findMany();
		res.status(200).json(notes);
	} catch (error) {
		res.status(500).json();
	} finally {
		await prisma.$disconnect();
	}
});

export default router;
