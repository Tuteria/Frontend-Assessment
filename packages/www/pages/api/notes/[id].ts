import { NextApiRequest, NextApiResponse } from 'next'
import {deleteNote, retrieveNoteById, updateNote} from "@tuteria/example-service/src/notes";

export default function noteHandler(req: NextApiRequest, res: NextApiResponse) {
	const {
		method,
	} = req

	switch (method) {
		case 'GET':
			retrieveNoteById(req, res)
			break
		case 'PUT':
			updateNote(req, res)
			break
		case 'DELETE':
			deleteNote(req, res);
			break;
		default:
			res.setHeader('Allow', ['GET', 'PUT'])
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}
