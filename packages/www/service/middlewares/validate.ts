import Validator from 'validatorjs';

const validate = (data: any, rules: any) => {
	const validation = new Validator(data, rules);
	return validation.fails()
}

const isInValidNoteId = (noteId: string): boolean =>
	validate({ noteId: noteId }, { noteId: 'string|integer'})

const isInValidNoteData = (title, description) => {
	const noteData = {
		title: title,
		description: description
	}
	const rules = {
		title: 'required|string',
		description: 'required|string',
	}
	return validate(noteData, rules)
}

/**
 * Validates field for a new note
 * @param handler - The handler that is returned
 */
function createNote(handler: Function) {
	return async (req, res) => {
		const { title, description } = req.body
		if (isInValidNoteData(title, description)) {
			return res.status(409).json({
				status: "error",
				error: "Invalid values were supplied",
			});
		}
		return handler(req, res);
	};
}

/**
 * Validates fields for route notes/:noteId
 * @param handler - The handler that is returned
 */
function notesNoteId(handler: Function) {
	return async (req, res) => {
		const { noteId } = req.query;
		const { description, title } = req.body;
		const { method } = req;
		
		switch (method) {
			case 'GET':
				if (isInValidNoteId(noteId)) {
					console.log(typeof noteId)
					return res.status(409).json({
						status: "error",
						error: "Invalid note id",
					});
				}
				break;
			case 'PUT':
				if (isInValidNoteId(noteId)) {
					return res.status(409).json({
						status: "error",
						error: "Invalid note id",
					});
				}
				if (isInValidNoteData(title, description)) {
					return res.status(409).json({
						status: "error",
						error: "Invalid values were supplied",
					});
				}
				break;
			case 'DELETE':
				if (isInValidNoteId(noteId)) {
					return res.status(409).json({
						status: "error",
						error: "Invalid note id",
					});
				}
				break;
			default:
				break;
		}

		return handler(req, res);
	};
}

/**
 * Validates fields for a new user
 * @param handler - The handler that is returned
 */
function createUser(handler: Function) {
	return async (req, res) => {
		const userData = {
			username: req.body.username,
			email: req.body.email,
			password: req.body.password 
		}
		const rules = {
			username: 'required|string',
			email: 'required|email',
			password: 'required|string'
		};
		if (validate(userData, rules)) {
			return res.status(409).json({
				status: "error",
				error: 'Invalid values were supplied'
			});
		}
		return handler(req, res);
	};
}

export { createNote, notesNoteId, createUser, isInValidNoteId };
