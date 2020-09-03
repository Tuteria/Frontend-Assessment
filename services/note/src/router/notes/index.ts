import express, { Router, Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";

const router: Router = express.Router()

router.get('/', (req: Request, res: Response) => {
  const welcome = { message: "welcome to the notes app" }
  res.json(welcome)
})

export default router