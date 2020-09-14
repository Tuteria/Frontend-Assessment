import {createNote} from "@tuteria/example-service/src/notes";
import {NextApiRequest, NextApiResponse} from "next";

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
