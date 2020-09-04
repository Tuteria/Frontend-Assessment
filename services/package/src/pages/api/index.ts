import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) =>
	res.json({ data: null, message: "Incorrect route", error: true });
