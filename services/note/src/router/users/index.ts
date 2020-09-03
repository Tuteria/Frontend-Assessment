import express, { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// create the router variable
const router: Router = express.Router();

// instantiate the prisma data layer
const prisma = new PrismaClient();

// send a get request to the notes endpoint to list all users
router.get("/", async (req: Request, res: Response) => {
	try {
		const users = await prisma.user.findMany();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json();
	} finally {
		await prisma.$disconnect();
	}
});

// send a get request to the notes endpoint to list one user by username
router.get("/:username", async (req: Request, res: Response) => {
	const { params } = req;
	try {
		const user = await prisma.user.findOne({
			where: { username: params.username },
		});
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json();
	} finally {
		await prisma.$disconnect();
	}
});

// send a get request to the notes endpoint to get note by a user
router.get("/:username/notes", async (req: Request, res: Response) => {
	const { params } = req;
	try {
		const user = await prisma.user
			.findOne({
				where: { username: params.username },
			})
			.notes();
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json();
	} finally {
		await prisma.$disconnect();
	}
});

export default router;
