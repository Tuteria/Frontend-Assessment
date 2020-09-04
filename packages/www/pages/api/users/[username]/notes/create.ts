import { NextApiRequest, NextApiResponse } from 'next';
import { userController } from '../../../../../service/controllers';
import { validate } from '../../../../../service/middleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	switch (method) {
		case "POST":
			return await userController.createNote(req, res);
			break;
		default:
			return res.status(405).json({
				status: "error",
				error: `Method ${method} Not Allowed`,
			});
			break;
	}
}

export default validate.createNote(handler);
