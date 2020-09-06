import { NextApiRequest, NextApiResponse } from "next";
import { authController } from "../../../service/controllers";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	switch (method) {
		case "POST":
			return authController.login(req, res);
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
