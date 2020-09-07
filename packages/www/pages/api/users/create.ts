import { NextApiRequest, NextApiResponse } from "next";
import { userController } from "../../../service/controllers";
import { validate } from '../../../service/middlewares';
import { jwtParser, checkAuth  } from '../../../service/middlewares';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	switch (method) {
		case "POST":
			return await userController.createUser(req, res);
			break;
		default:
			return res.status(405).json({
				status: "error",
				error: `Method ${method} Not Allowed`,
			});
			break;
	}
}

export default jwtParser(checkAuth.admin(validate.createUser(handler)));
