import Validator from 'validatorjs';

type Error = {
	message: string;
	param: string;
};

const validate = (data: any, rules: any) => {
	const validation = new Validator(data, rules);
	return validation.fails()
}

const note = {
	title: 'required|string|',
	description: 'required|string|',
}

/**
 * Checks for required field
 * @param fields - Array of fields
 * @param req - The Request object
 */
const checkRequiredFields = (fields: string[], req): Error[] => {
	const errors: Error[] = [];

	for (const field of fields) {
		if (!(field in req.body)) {
			errors.push({
				message: `${field} is mising. ${field} is required`,
				param: field,
			});
		}
	}

	return errors;
};

/**
 * Validates field for a new note
 * @param handler - The handler that is returned
 */
function createNote(handler: Function) {
	return async (req, res) => {
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
 * Checks if a string is a valid noteId
 * @param noteId 
 * @return boolean 
 */
function isValidNoteId(noteId: string): boolean {
  if (noteId.trim().length === 0) {
    return false
  }else if (isNaN(Number(noteId))) {
    return false
  } else {
    return noteId.match(/\d/g).length === noteId.length
  }
}

/**
 * Validates field for updating a note
 * @param handler - The handler that is returned
 */
function updateNote(handler: Function) {
	return async (req, res) => {
		const noteData = {
			title: req.body.title,
			description: req.body.description
		}
		const rules = {
			title: 'required|string',
			description: 'required|string',
		}
		if (validate(noteData, rules)) {
			return res.status(409).json({
				status: "error",
				error: "Invalid values were supplied",
			});
		}
    if (validate({ noteId: req.query.noteId },{ noteId: 'string|integer'})) {
      return res.status(409).json({
				status: "error",
				error: "Invalid username",
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
			password: 'required'
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

export { createNote, updateNote, createUser };
