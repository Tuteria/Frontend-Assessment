import { noteService } from "../db";

/**
 * Retrieves all anonymous notes from the db
 * @param req - The Request object
 * @param res - The Response object
 */
async function getNotes(req, res) {
	try {
		const notes = await noteService.getAnonymousNotes();
		res.status(200).json({
			status: "success",
			data: notes,
		});
	} catch (error) {
		return res.status(500).json({
			status: error,
			error: "Something went wrong",
		});
	}
}

/**
 * Creates an anonymous new note
 * @param req - The Request object
 * @param res - The Response object
 */
async function createNote(req, res) {
	const { description, title } = req.body;
	try {
		const newNote = await noteService.createNote({
			description,
			title,
		});
		res.status(201).json({
			status: "success",
			data: {
				message: "Note successfully created",
				title: newNote.title,
			},
		});
	} catch (error) {
		return res.status(500).json({
			status: error,
			error: "Something went wrong",
		});
	}
}

/**
 * Updates an anonymous note
 * @param req - The Request object
 * @param res - The Response object
 */
async function getOneNote(req, res) {
  let { noteId } = req.query;
	noteId = Number(noteId);
  const { description, title } = req.body;
	try {
		const note = await noteService.findById(noteId);
		if (!note) {
			return res.status(409).json({
				status: "error",
				error: "Note does not exist",
			});
		}
		if (note.user_id) {
			return res.status(403).json({
				status: 'error',
				error: "You caa not authorized for this operation note",
			});
		}
		return res.status(200).json({
			status: 'error',
			data: {
				...note
			}
		})
	} catch (error) {
		return res.status(500).json({
			status: 'error',
			error: "Something went wrong",
		});
	}
}

/**
 * Updates an anonymous note
 * @param req - The Request object
 * @param res - The Response object
 */
async function updateNote(req, res) {
  let { noteId } = req.query;
	noteId = Number(noteId);
  const { description, title } = req.body;
	try {
		const note = await noteService.findById(noteId);
		if (!note) {
			return res.status(409).json({
				status: "error",
				error: "Note does not exist",
			});
		}
		if (note.user_id) {
			return res.status(403).json({
				status: 'error',
				error: "You caa not authorized to perform this operation",
			});
		}
		const result = await noteService.updateNote(noteId, {
			description,
			title,
		});
		res.status(200).json({
			status: "success",
			data: {
				message: "Notes successfully updated",
				title: result.title,
			},
		});
	} catch (error) {
		return res.status(500).json({
			status: 'error',
			error: "Something went wrong",
		});
	}
}

/**
 * Deletes an anonymous note
 * @param req - The Request object
 * @param res - The Response object
 */
async function deleteNote(req, res) {
	let { noteId } = req.query;
	noteId = Number(noteId);
	try {
		const note = await noteService.findById(noteId);
		if (!note) {
			return res.status(409).json({
				status: "error",
				error: "Note does not exist",
			});
		}
		if (note.user_id) {
			return res.status(403).json({
				status: 'error',
				error: "YYou caa not authorized to perform this operation",
			});
		}
		const result = await noteService.deleteOne(noteId);
		res.status(200).json({
			status: "success",
			data: {
				message: "Notes successfully deleted",
				title: result.title,
			},
		});
	} catch (error) {
		return res.status(500).json({
			status: 'error',
			error: "Something went wrong",
		});
	}
}

export { getNotes, createNote, getOneNote, updateNote, deleteNote};
