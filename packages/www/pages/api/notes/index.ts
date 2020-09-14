import {retrieveAllNotes} from "@tuteria/example-service/src/notes";
import {NextApiRequest, NextApiResponse} from "next";

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
