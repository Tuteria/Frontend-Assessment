import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async  (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'GET') {
    try {

      res.statusCode = 200
      const data = await prisma.notes.findMany();
      return res.json({ data })

    } catch(e) {
      return res.status(500).json({
        error: "An error occured, pls try again later.",
      });
    }
  }

  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${method} Not Allowed`)
}
