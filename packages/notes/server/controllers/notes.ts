import { Request, Response } from "express";
import Joi, { ValidationError } from "joi";
import { notesCreateInput } from "@prisma/client";
import { CustomRequest } from "../types";
import { prisma } from "../lib";

const schema = Joi.object({
	title: Joi.string(),
	description: Joi.string()
});

export async function createNote(req: CustomRequest, res: Response) {
	try {
		const { user } = req;
		const { title, description } = await schema.validateAsync(req.body);
		const data: notesCreateInput = { title, description }
		if (user) {
			data.author = {
				connect: { id: user.id }
			}
		}
		const note = await prisma.notes.create({ data });
		res.status(200).json(note);
	} catch (e) {
		if (e instanceof ValidationError) {
			res.status(400).json({ message: e.message });
		} else throw e;
	}
}

export async function getNotes(req: Request, res: Response) {
	const notes = await prisma.notes.findMany({
		where: {
			author_id: {
				equals: null
			}
		},
		select: {
			id: true,
			title: true,
			description: true
		}
	});
	res.json(notes);
}

export async function getNote(req: Request, res: Response) {
	const { id } = req.params;
	const note = await prisma.notes.findOne({
		where: { id: Number(id) }
	});
	res.json(note);
}
