// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

//gets a user whose id is passed

export default async (
	{ query: { id } }: NextApiRequest | any,
	res: NextApiResponse
) => {
	try {
		const result = await prisma.users.findOne({
			where: { id: parseInt(id) },
		});

		if (result === null) {
			return res.status(404).send("user does not exist");
		}
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
};
