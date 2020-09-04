import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

/* 
##Routes
1. creates a user - /users/create- POST request
2. gets all users - /users - GET request
3. gets notes of a user - /users/:username/notes - GET request
*/

//creates a user - /users/create
router.post("/create", async (req, res) => {
	try {
		const prisma: PrismaClient = req.app.locals.prisma;
		const { email, password }: { email: string; password: string } = req.body;
		if (!email || !password) {
			return res.status(400).send("email and password fields are required");
		}
		//prevents duplicate emails
		const emailExists = await prisma.users.findMany({
			where: { email },
		});

		if (emailExists.length > 0) {
			return res.send("user already exists");
		}
		const result = await prisma.users.create({
			data: { email, password },
		});
		res.status(200).send("user successfully created");
	} catch (err) {
		console.log(err.message);
	}
});

router.post("/login", async (req, res) => {
	try {
		const prisma: PrismaClient = req.app.locals.prisma;
		const { email, password }: { email: string; password: string } = req.body;
		if (!email || !password) {
			return res.status(400).send("email and password fields are required");
		}
		//checks if email exists
		const userExists = await prisma.users.findMany({
			where: { email },
		});

		if (userExists.length === 0) {
			return res.send("user doesn't exist");
		}
		if (userExists[0].password !== password) {
			return res.send("wrong email or password");
		}

		const token = jwt.sign(
			{
				user_id: userExists[0].id,
			},
			process.env.TOKEN_SECRET,
			{
				expiresIn: "7d",
			}
		);
		res.status(200).send({
			success: true,
			token,
		});
	} catch (err) {
		console.log(err.message);
	}
});

//gets all users - /users - admin page

router.get("/", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;

	const result = await prisma.users.findMany();
	res.send(result);
});

//gets a user - /users/:id - where id is authorId

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const prisma: PrismaClient = req.app.locals.prisma;
		const result = await prisma.users.findOne({
			where: { id: parseInt(id) },
		});

		if (result === null) {
			return res.status(404).send("user does not exist");
		}
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});

//gets notes of a user - /users/:id/notes - id is userID

router.get("/:id/notes", async (req, res) => {
	try {
		const prisma: PrismaClient = req.app.locals.prisma;
		const result = await prisma.notes.findMany({
			where: {
				authorId: parseInt(req.params.id),
			},
		});

		res.status(200).json(result);
	} catch (err) {
		console.log(err.message);
	}
});

export default router;
