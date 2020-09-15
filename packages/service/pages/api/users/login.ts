import {NextApiRequest, NextApiResponse} from "next";
import {loginUser} from "../../../src/users";

export default function userHandler(req:NextApiRequest, res:NextApiResponse) {
	const {
		query: { id, name },
		method,
	} = req

	switch (method) {
		case 'POST':
			loginUser(req, res)
			break
		default:
			res.status(405).end(`Method ${method} Not Allowed`)
	}
}
