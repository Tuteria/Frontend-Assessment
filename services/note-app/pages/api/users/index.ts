import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import isAdmin from "../../../utils/isAdmin";

const prisma = new PrismaClient()

export default async  (req: NextApiRequest, res: NextApiResponse) => {
  isAdmin(req, res)
  
  const { method } =  req;
  if (method === 'GET'){
    try{
      const result: any = await prisma.users.findMany({});
      return res.status(200).json({data: result});
  
    } catch(e) {
      return res.status(500).json({
        error: 'An error occured, pls try again later.'
      });
    }

  }
  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${method} Not Allowed`)
}
