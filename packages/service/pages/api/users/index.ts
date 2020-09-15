import {NextApiRequest, NextApiResponse} from "next";
import {retrieveAllUsers} from "../../../src/users";

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	switch (method) {
		case "GET":
			retrieveAllUsers(req, res);
			break;
		default:
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}
