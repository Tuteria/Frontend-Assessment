import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

// POST /users/create Endpoint to create a user
router.post("/create", async (req, res, next) => {
	try {
		const prisma: PrismaClient = req.app.locals.prisma;
		const { username, email, password, bio } = req.body;
		const result = await prisma.users.create({
			data: { username, email, password, bio },
		});
		const authToken = jwt.sign(
			{
				user_id: result.id,
			},
			"secret12345",
			{
				expiresIn: "7d",
			}
		);
		res.status(200).json({ ...result, token: authToken });
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.post("/login", async (req, res, next) => {
	try {
		const prisma: PrismaClient = req.app.locals.prisma;
		const { email, password }: { email: string; password: string } = req.body;
		if (!email || !password) {
			return res.status(400).send("email and password are required");
		}
		//checks if email exists
		const result = await prisma.users.findMany({
			where: { email },
		});

		const user = result[0];

		if (!user) {
			return res.send("user doesn't exists");
		}
		if (user.password !== password) {
			return res.send("wrong email or password");
		}

		const token = jwt.sign(
			{
				user_id: user.id,
			},
			"secret12345",
			{
				expiresIn: "7d",
			}
		);
		res.status(200).send({
			success: true,
			token,
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
});

// GET /users/:username Fetch a particular user
router.get("/:username", async (req, res, next) => {
	try {
		const { username } = req.params;
		const prisma: PrismaClient = req.app.locals.prisma;
		const result = await prisma.users.findMany({
			where: { username },
		});

		const user = result[0];

		if (!user) {
			return res.status(404).send("user not found");
		}
		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

// GET /users/:username/notes Fetching the notes of a particular user
router.get("/:username/notes", async (req, res, next) => {
	try {
		const prisma: PrismaClient = req.app.locals.prisma;
		const result = await prisma.notes.findMany({
			where: {
				username: req.params.username,
			},
		});
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

export default router;
