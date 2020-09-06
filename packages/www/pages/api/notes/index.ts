// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
//gets all notes
export default async (req, res) => {
	try {
		const result = await prisma.notes.findMany();
		res.status(200).json(result);
	} catch (err) {
		res.status(500).send(err.message);
	}
};
