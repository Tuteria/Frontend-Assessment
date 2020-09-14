import {loginUser} from "@tuteria/example-service/src/users";

export default function userHandler(req, res) {
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
