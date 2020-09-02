import { NextApiRequest, NextApiResponse } from 'next';
import { userController } from '../../../../../service/controllers';
import { validate } from '../../../../../service/middleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	switch (method) {
		case "GET":
			return await userController.getOneNote(req, res);
      break;
    case "PUT":
      return await userController.updateOneNote(req, res);
      break;
    case "DELETE":
      return await userController.deleteOneNote(req, res);
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
