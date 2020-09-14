import {retrieveUserNotes} from "@tuteria/example-service/src/users";
import {NextApiRequest, NextApiResponse} from "next";

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { username },
		method,
	} = req

	switch (method) {
		case 'GET':
			retrieveUserNotes(req, res)
			break
		default:
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}
