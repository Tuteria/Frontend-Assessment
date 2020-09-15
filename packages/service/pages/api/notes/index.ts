import {NextApiRequest, NextApiResponse} from "next";
import {retrieveAllNotes} from "../../../src/notes";

export default function noteHandler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	switch (method) {
		case "GET":
			retrieveAllNotes(req, res);
			break;
		default:
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}
