import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) =>
	res.status(501).json({ data: null, message: "Incorrect route", error: true });
