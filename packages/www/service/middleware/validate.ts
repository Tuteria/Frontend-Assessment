type Error = {
	message: string;
	param: string;
};

/**
 * Checks if a value is a string
 * @param value
 * return A boolean value of the check
 */
const isString = (value: any): boolean => typeof value === "string";

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
		const { title, description } = req.body;
		const errors = checkRequiredFields(["title", "description"], req);
		if (errors.length > 0) {
			return res.status(409).json({
				status: "error",
				error: errors,
			});
		}
		if (!(isString(title) && isString(description))) {
			return res.status(409).json({
				status: "error",
				error: "Invalid data",
			});
		}
		if (title.trim().length === 0) {
			return res.status(409).json({
				status: "error",
				error: "title cannot be empty",
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
 * Validates field for a new note
 * @param handler - The handler that is returned
 */
function updateNote(handler: Function) {
	return async (req, res) => {
		const { title, description } = req.body;
		const errors = checkRequiredFields(["title", "description"], req);
		if (errors.length > 0) {
			return res.status(409).json({
				status: "error",
				error: errors,
			});
		}
		if (!(isString(title) && isString(description))) {
			return res.status(409).json({
				status: "error",
				error: "Invalid data",
			});
		}
		if (title.trim().length === 0) {
			return res.status(409).json({
				status: "error",
				error: "title cannot be empty",
			});
    }
    if (!isValidNoteId(req.query.noteId)) {
      return res.status(409).json({
				status: "error",
				error: "Invalid username",
			});
    }
		return handler(req, res);
	};
}


export { createNote, updateNote };
