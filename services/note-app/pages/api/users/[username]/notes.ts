import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async  (req: NextApiRequest, res: NextApiResponse) => {
  const { method } =  req;
  const { query: { username } } = req;

  if (method === 'GET'){
    try{
      const result: any = await prisma.users.findOne({
        where: { username: username },
      });
  
      if (result) {
        delete result.password
  
        const userNotes = await prisma.notes.findMany({
          where: { user: username },
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
  res.setHeader('Allow', ['POST'])
  return res.status(405).end(`Method ${method} Not Allowed`)
}
