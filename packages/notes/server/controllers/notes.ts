import { Request, Response } from "express";
import { ValidationError } from "joi";
import { notesCreateInput } from "@prisma/client";
import { CustomRequest } from "../../types";
import { prisma } from "../lib";
import { noteSchema as schema } from "../schema";

export async function createNote(req: CustomRequest, res: Response) {
	try {
		const { user } = req;
		const { title, description } = await schema.validateAsync(req.body);
		const data: notesCreateInput = { title, description };
		if (user) {
			data.author = {
				connect: { id: user.id },
			};
		}
		const note = await prisma.notes.create({
			data,
			include: {
				author: {
					select: {
						id: true,
						username: true,
					},
				},
			},
		});
		res.status(201).json(note);
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
				equals: null,
			},
		},
	});
	res.json(notes);
}

export async function getNote(req: Request, res: Response) {
	const { id } = req.params;
	const note = await prisma.notes.findOne({
		where: { id: Number(id) },
	});
	if (!note) res.json({});
	else res.json(note);
}

export async function updateNote(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const { title, description } = await schema.validateAsync(req.body);
		const note = await prisma.notes.update({
			where: { id: Number(id) },
			data: { title, description },
			include: {
				author: {
					select: {
						id: true,
						username: true,
					},
				},
			},
		});
		res.json(note);
	} catch (e) {
		if (e instanceof ValidationError) {
			res.status(400).json({ message: e.message });
		} else throw e;
	}
}

export async function deleteNote(req: Request, res: Response) {
	const { id } = req.params;
	const note = await prisma.notes.delete({
		where: { id: Number(id) },
	});
	res.json(note);
}
