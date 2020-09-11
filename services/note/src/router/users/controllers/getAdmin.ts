import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

// instantiate the prisma data layer
const prisma = new PrismaClient();

export const getAdmin = async (req: Request, res: Response) => {
	try {
		const admins = await prisma.admin.findMany();
		res.status(200).json(admins);
	} catch (error) {
		res.status(500).json();
	} finally {
		await prisma.$disconnect();
	}
};
