import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import isAdmin from "../../../../utils/isAdmin";

const prisma = new PrismaClient()

export default async  (req: NextApiRequest, res: NextApiResponse) => {
  isAdmin(req, res);

  const { method } =  req;
  const { username } = req.query;
  const user = String(username)

  if (method === 'GET'){
    try{
      const result: any = await prisma.users.findOne({
        where: { username: user },
      });
  
      if (result) {
        delete result.password
  
        const userNotes = await prisma.notes.findMany({
          where: { user },
        });
        result['notes'] = userNotes;
  
        return res.status(200).json({data: result});
  
      } else {
        return res.status(404).json({message: 'Use not found'});
  
      }
  
    } catch(e) {
      return res.status(500).json({
        error: 'An error occured, pls try again later.'
      });
    }

  }
  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${method} Not Allowed`)
}
