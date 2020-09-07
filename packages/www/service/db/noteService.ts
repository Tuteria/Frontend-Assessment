import prisma from './prisma'

interface Note {
	title: string;
	description: string;
}

/**
 * Retrives all notes from the db
 * @return {Promise} - A promises that resolves to all anonymous note
 */
async function getAnonymousNotes() {
	try {
		const notes = await prisma.notes.findMany({
			where : {user_id: null}
		});
		return notes;
	} catch (error) {
		return error;
	}
}

/**
 * Retrives all notes from the db
 * @return {Promise} - A promises that resolves to all anonymous note
 */
async function getAllNotes() {
	try {
		const notes = await prisma.notes.findMany();
		return notes;
	} catch (error) {
		return error;
	}
}

/**
 * Adds a new note to the db
 * @param note
 * @return {Promise} - A promises that resolves to the new created note
 */
async function createNote(note: Note) {
	const { description, title } = note;
	try {
		const createNote = await prisma.notes.create({
			data: { description, title },
		});
		return createNote;
	} catch (error) {
		return error;
	}
}

/**
 * Retrieves a note that matches the id
 * @param {number} id - id of a note
 * @return {Promise} - A promises that resolves to a note that matches the id
 */
async function findById(id: number) {
	try {
		const note = await prisma.notes.findOne({
			where: { id: id },
		});
		return note;
	} catch (error) {
		return error;
	}
}

/**
 *Updates a note in the db
 * @param {number} id - id of a note
 * @param {} note
 * @return {Promise} - A promises that resolves to the details of the updated note
 */
async function updateNote(id: number, note: Note) {
	const { description, title } = note;
	try {
		const result = await prisma.notes.update({
			where: { id: id },
			data: { description, title },
		});
		return result;
	} catch (error) {
		return error;
	}
}

/**
 * Deletes a note from the db
 * @param id - id of a note
 */
async function deleteOne(id: number) {
	try {
		const result = await prisma.notes.delete({
			where: { id: id }
		});
		return result;
	} catch (error) {
		return error
	}
}

/**
 * Retrieves a note that matches the id
 * @param {number} id - id of user
 * @return {Promise} - A promises that resolves to a note that matches the id
 */
async function getNotesByUserId(id: number) {
	try {
		const notes = await prisma.notes.findMany({
			where: { user_id: Number(id) },
		});
		return notes;
	} catch (error) {
		return error;
	}
}

/**
 * Adds a user's new note to the db
 * @param note
 * @return {Promise} - A promises that resolves to the new created note
 */
async function createUserNote(userId, note: Note) {
	const { description, title } = note;
	try {
		const createNote = await prisma.notes.create({
			data: { description, title, user_id: userId },
		});
		return createNote;
	} catch (error) {
		return error;
	}
}

export { 
	createNote, findById, getAnonymousNotes, getAllNotes, 
	updateNote, deleteOne, getNotesByUserId, createUserNote
};
