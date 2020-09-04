import Validator from 'validatorjs';

const validate = (data: any, rules: any) => {
	const validation = new Validator(data, rules);
	return validation.fails()
}

/**
 * Checks if a string is a valid noteId
 * @param noteId 
 * @return boolean 
 */
// function isValidNoteId(noteId: string): boolean {
//   if (noteId.trim().length === 0) {
//     return false
//   }else if (isNaN(Number(noteId))) {
//     return false
//   } else {
//     return noteId.match(/\d/g).length === noteId.length
//   }
// }

const isValidNoteId = (noteId: string): boolean =>
	validate({ noteId: noteId },{ noteId: 'string|integer'})

const isValidNoteData = (title, description) => {
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
				if (isValidNoteId(noteId)) {
					return res.status(409).json({
						status: "error",
						error: "Invalid note id",
					});
				}
				break;
			case 'PUT':
				if (isValidNoteId(noteId)) {
					return res.status(409).json({
						status: "error",
						error: "Invalid note id",
					});
				}
				if (isValidNoteData(title, description)) {
					return res.status(409).json({
						status: "error",
						error: "Invalid values were supplied",
					});
				}
				break;
			case 'DELETE':
				if (isValidNoteId(noteId)) {
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
 * Validates field for a new note
 * @param handler - The handler that is returned
 */
function createNote(handler: Function) {
	return async (req, res) => {

		if (req.method === 'GET') {
			return handler(req, res);
		}
		const noteData = {
			title: req.body.title,
			description: req.body.description
		}
		const rules = {
			title: 'required|string',
			description: 'required|string'
		}
		if (validate(noteData, rules)) {
			return res.status(409).json({
				status: "error",
				error: "Invalid values were supplied",
			});
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

export { createNote, notesNoteId, createUser, isValidNoteId };
