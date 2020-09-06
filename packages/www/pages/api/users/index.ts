import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
// gets all users

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const result = await prisma.users.findMany();
	res.send(result);
};
