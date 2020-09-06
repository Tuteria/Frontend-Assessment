import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async  (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { title, description, user } = req.body;
  const { query: { noteId } } = req;
  const noteID = Number(noteId)

  if (method === 'GET') { 
    try {
      const noteResult = await prisma.notes.findOne({ where: { id: noteID } });
  
      if (noteResult) {
        return res.status(200).json({ data: noteResult });
      } else {
        return res.status(404).json({ error: "Note not found!" });
      }
    } catch (e) {
      return res.status(500).json({
        error: "An error occured, pls try again later.",
        e,
      });
    }
  }
  else if (method === 'PUT') { 
    try {
      const noteResult = await prisma.notes.findOne({ where: { id: noteID } });
  
      if (noteResult) {
        const result = await prisma.notes.update({
          where: { id: noteID },
          data: {
            title: title ? title : noteResult.title,
            description: description ? description : noteResult.description,
            user: user ? user : noteResult.user,
          },
        });
  
        return res.status(200).json({ data: result });
      } else {
        return res.status(404).json({ error: "Note not found!" });
      }
    } catch (e) {
      return res.status(500).json({
        error: "An error occured, pls try again later.",
        e,
      });
    }
  } else if(method === 'DELETE') {
    try {
      const noteResult = await prisma.notes.findOne({ where: { id: noteID } });
  
      if (noteResult) {
        const result = await prisma.notes.delete({ where: { id: noteID } });
  
        return res
          .status(200)
          .json({ message: "Note deleted succesfully", data: result });
      } else {
        return res.status(404).json({ error: "Note not found!" });
      }
    } catch (e) {
      return res.status(500).json({
        error: "An error occured, pls try again later.",
        e,
      });
    }
  }

  res.setHeader('Allow', ['PUT'])
  return res.status(405).end(`Method ${method} Not Allowed`)
}
