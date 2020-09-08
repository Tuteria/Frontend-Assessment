import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import isAdmin from "../../../utils/isAdmin";
import hashPass from "../../../utils/hashPass";

const prisma = new PrismaClient()

export default async  (req: NextApiRequest, res: NextApiResponse) => {
  isAdmin(req, res);

  const { method } =  req;

  if (method === 'POST'){
  
    
    const { username, password, email } = req.body;
    const role = req.body.role? req.body.role : 'user';
    const hassPassword = hashPass(password);
  
    try {
      const result = await prisma.users.create({
        data: { username, password: hassPassword, email, role },
			});
			delete result.password

			return res.status(201).json({message: 'User created succesfully', data: result});

    } catch(e) {
      return res.status(500).json({
        error: 'An error occured, pls try again later.',
      });
    }

  } else if (method === 'GET') {

  }
  res.setHeader('Allow', ['POST'])
  return res.status(405).end(`Method ${method} Not Allowed`)
}
