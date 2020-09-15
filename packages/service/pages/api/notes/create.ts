import {NextApiRequest, NextApiResponse} from "next";
import {createNote} from "../../../src/notes";

export default function noteHandler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	switch (method) {
		case "POST":
			createNote(req, res);
			break;
		default:
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}
