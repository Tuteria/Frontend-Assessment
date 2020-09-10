import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import "./env";
import { authRequired, adminOnly } from "./middlewares";

const SALT = 10;

const router = Router();

router.post("/create", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { username, password } = req.body;

	const userExist = await prisma.users.findOne({ where: { username } });
	if (userExist) {
		return res
			.status(409)
			.json({ message: "User with credentials already exists" });
	}

	try {
		const hashedPassword = bcrypt.hashSync(password, SALT);
		const user = await prisma.users.create({
			data: {
				username,
				password: hashedPassword,
			},
		});
		return res.status(201).json(user);
	} catch (err) {
		return res.status(500).json({ message: "Uh Uh! Something went wrong" });
	}
});

router.get("/", authRequired, adminOnly, async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const users = await prisma.users.findMany({ include: { notes: true } });
	return res.status(200).json(users);
});

router.post("/login", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { username, password } = req.body;
	const user = await prisma.users.findOne({ where: { username } });
	if (!user ?? !bcrypt.compareSync(password, user?.password || "")) {
		return res.status(401).json({ message: "Invalid login credentials" });
	}
	const token = jwt.sign(
		{ user: { username: user?.username, id: user?.id } },
		process.env?.SECRET_KEY || ""
	);
	return res.status(200).json({ message: "success", user, token });
});

router.get("/:username/notes", authRequired, async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { username } = req.params;
	const user = await prisma.users.findOne({
		where: { username },
		include: { notes: true },
	});
	if (!user) {
		return res.status(404).json({ message: "username does not exist" });
	}
	res.status(200).json(user.notes);
});

router.post("/admin/login", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { username, password } = req.body;
	const adminUser = process.env.ADMIN_USER;
	const adminPass = process.env.ADMIN_PASSWORD;

	if (username === adminUser && password === adminPass) {
		let user = await prisma.users.findOne({ where: { username } });
		if (!user) {
			const hashedPassword = bcrypt.hashSync(password, SALT);
			user = await prisma.users.create({
				data: {
					username,
					password: hashedPassword,
					is_admin: true,
				},
			});
		}
		const token = jwt.sign(
			{
				user: { id: user.id, username: user.username, is_admin: user.is_admin },
			},
			process.env.SECRET_KEY || ""
		);
		return res.status(200).json({
			message: "successful",
			user,
			token,
		});
	}
	return res.status(401).json({
		message: "Hmmm... It seems you are not an admin user",
	});
});
export default router;
