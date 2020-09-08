import { Request, Response } from "express";
import Joi, { ValidationError } from "joi";
import { users as User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib";

const schema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
	admin: Joi.boolean()
});

export async function getUsersNotes(req: Request, res: Response) {
	const { username } = req.params;
	const notes = await prisma.notes.findMany({
		where: { author: { username } }
	});
	res.json(notes);
}
