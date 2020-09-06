// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

//gets notes of a user - /users/:id/notes - id is userID

export default async (
	{ query: { id } }: NextApiRequest | any,
	res: NextApiResponse
) => {
	try {
		const result = await prisma.notes.findMany({
			where: {
				authorId: parseInt(id),
			},
		});

		res.status(200).json(result);
	} catch (err) {
		console.log(err.message);
	}
};
