import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async  (req: NextApiRequest, res: NextApiResponse) => {
  const { method } =  req;
  const { description, title, user } = req.body;

  if (method === 'POST'){
    try {
      const error = {}
      const requredMsg = 'this field is required!';

      // validate user input
      if (!title) {
        error['title'] = requredMsg;
      }

      if (!description) {
        error['description'] = requredMsg;
      }

      if (Object.keys(error).length !== 0 && error.constructor === Object) {
        return res.status(400).json(error);
      }

      // create note

      const result = await prisma.notes.create({
        data: { description, title, user },
      });
      return res.status(201).json(result);
    } catch (e) {
      return res.status(500).json({
        error: "An error occured, pls try again later.",
      });
    }

  }
  res.setHeader('Allow', ['POST'])
  return res.status(405).end(`Method ${method} Not Allowed`)
}
