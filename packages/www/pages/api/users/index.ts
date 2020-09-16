import {NextApiRequest, NextApiResponse} from "next";
import {retrieveAllUsers} from "@tuteria/example-service/src/users";
import {createUser} from "@tuteria/example-service/src/users";

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	switch (method) {
		case "GET":
			retrieveAllUsers(req, res);
			break;
		case "POST":
			createUser(req, res);
			break;
		default:
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}
