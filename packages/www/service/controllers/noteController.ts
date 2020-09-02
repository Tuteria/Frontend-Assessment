import { noteService } from "../db";

/**
 * Retrieves all anonymous notes from the db
 * @param req - The Request object
 * @param res - The Response object
 */
async function getNotes(req, res) {
	try {
		const notes = await noteService.getAllNotes();
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
 * Creates a new note
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
 * Updates a note
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
			status: error,
			error: "Something went wrong",
		});
	}
}

/**
 * Deletes a note
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
		const result = await noteService.deleteOne(noteId);
		res.status(200).json({
			status: "success",
			data: {
				message: "Notes successfully deleted",
				title: result.title,
			},
		});
	} catch (error) {
		return error;
	}
}

export { getNotes, createNote, updateNote, deleteNote};
