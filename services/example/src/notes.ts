import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();

router.post("/create", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { description, title } = req.body;
	const result = await prisma.notes.create({
		data: { description, title },
	});
	res.status(200).json(result);
});


router.get("/", async(req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const result = await prisma.notes.findMany();
	res.json(result);
});

export default router;
