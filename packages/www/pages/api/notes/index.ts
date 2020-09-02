import { NextApiRequest, NextApiResponse } from "next";
import { noteController } from "../../../service/controllers";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	switch (method) {
		case "GET":
			return await noteController.getNotes(req, res);
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
