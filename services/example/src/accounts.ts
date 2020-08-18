import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();

router.post("/create", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { username, api_key, api_secret } = req.body;
	const result = await prisma.accounts.create({
		data: { owner: username, api_key, api_secret, freeze: false,markets:[] },
	});
	res.status(200).json(result);
});

export default router;
