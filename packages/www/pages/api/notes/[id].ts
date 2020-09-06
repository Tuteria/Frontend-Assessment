// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

//gets a note with id passed
export default async (
	{ query: { id } }: NextApiRequest | any,
	res: NextApiResponse
) => {
	try {
		const result = await prisma.notes.findOne({
			where: {
				id: parseInt(id),
			},
		});
		if (result === null) {
			return res.send("");
		}

		res.status(200).json(result);
	} catch (err) {
		console.log(err.message);

		res.status(500).send(err.message);
	}
};
