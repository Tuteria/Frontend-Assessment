import { NextApiRequest, NextApiResponse } from "next";
import { userController } from "../../../service/controllers";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	switch (method) {
		case "GET":
			return userController.getUsers(req, res);
			break;
		default:
			return res.status(405).json({
				status: "error",
				error: `Method ${method} Not Allowed`,
			});
			break;
	}
}

export default handler;
