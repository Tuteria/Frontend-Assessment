import { Request, Response } from "express";
import Joi, { ValidationError } from "joi";
import { CustomRequest } from "../types";
import { prisma } from "../lib";

const schema = Joi.object({
	title: Joi.string(),
	description: Joi.string()
});

export async function createNote(req: CustomRequest, res: Response) {
	try {
		const { title, description } = await schema.validateAsync(req.body);
		const note = await prisma.notes.create({
			data: { title, description }
		});
		res.status(200).json(note);
	} catch (e) {
		if (e instanceof ValidationError) {
			res.status(400).json({ message: e.message });
		} else throw e;
	}
}
