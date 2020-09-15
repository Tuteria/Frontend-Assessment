import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Creates a new Note
 * @param {object} req
 * @param {object} res
 * @returns {(json)}JSON object
 */
async function createNote(req: any, res: any) {
	try {
		const {
			title,
			description,
		} = req.body;

		// create the note
		const result = await prisma.notes.create({
			data: { description, title },
		});

		return res.status(201).json({
			success: true,
			message: 'Note created',
			result,
		});
	} catch (error) {
		return res.status(500).json({
			success: 'error',
			message: error.message,
			error,
		});
	}
};

/**
 * Modifies an existing note
 * @param {object} req
 * @param {object} res
 * @returns {(json)}JSON object
 */
async function updateNote(req: any, res: any) {
	try {
		console.log(req.query);
		const id = parseInt(req.query.id, 10);
		const { description, title } = req.body;
		const note = await prisma.notes.findOne({ where: { id: id } });

		if (note) {
			const updatedNote = await prisma.notes.update({
				where: { id: Number(id) },
				data: { description: description || note.description, title: title || note.title, },
			})
			return res.status(200).json({
				success: true,
				message: 'note updated',
				note: updatedNote,
			});
		} else {
			return res.status(404).json({
				success: false,
				message: `Cannot find note with id ${id}`,
			});
		}
	} catch (error) {
		return res.status(500).json({
			success: 'error',
			message: error.message,
			error
		});
	}
};


/**
 * Deletes an existing note
 * @param {object} req
 * @param {object} res
 * @returns {(json)}JSON object
 */
async function deleteNote(req: any, res: any) {
	try {
		const id = parseInt(req.query.id, 10);
		const note = await prisma.notes.findOne({ where: { id: id } });
		if (note) {
			const deletedNote = await prisma.notes.delete({
				where: {
					id: Number(id),
				},
			})
			return res.status(200).json({
				success: true,
				message: 'Note deleted',
				deletedNote,
			});
		} else {
			return res.status(404).json({
				success: false,
				message: `Cannot find note with id ${id}`,
			});
		}
	} catch (error) {
		return res.status(500).json({
			success: 'error',
			message: error.message,
			error,
		});
	}
};

/**
 * Retrieves all Anonymous Notes
 * @param {object} req
 * @param {object} res
 * @returns {(json)}JSON object
 */
async function retrieveAllNotes(req: any, res: any) {
	try {
		const notes = await prisma.notes.findMany({where: { user_id: null }});
		return res.status(200).json({
			success: true,
			message: 'Notes retrieved',
			notes
		});
	} catch (error) {
		return res.status(500).json({
			success: 'error',
			message: error.message,
			error,
		});
	}
};

/**
 * Retrieve a single note
 * @param {object} req
 * @param {object} res
 * @returns {(json)}JSON object
 */
async function retrieveNoteById(req: any, res: any) {
	try {
		const id = parseInt(req.query.id, 10);
		const note = await prisma.notes.findOne({
			where: { id: id },
		});
		if (!note) {
			return res.status(404).json({
				success: false,
				message: `Cannot find note with id ${id}`,
			});
		}
		return res.status(200).json({
			success: true,
			message: 'note retrieved',
			note,
		});
	} catch (error) {
		return res.status(500).json({
			success: 'error',
			message: error.message,
			error,
		});
	}
};

export { retrieveAllNotes, createNote, retrieveNoteById, updateNote, deleteNote};

