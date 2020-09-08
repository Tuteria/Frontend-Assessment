import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const key = process.env.SECRET_KEY || 'this∂®ƒ†®coulud%3be%-real man'; 


const prisma = new PrismaClient()

function hashPass(str: string) {
	const shasum = crypto.createHash("sha512");
	shasum.update(str);
	return shasum.digest("hex");
}

export default async  (req: NextApiRequest, res: NextApiResponse) => {
  const { method } =  req;
  
  if (method === 'POST'){
    const { password, email } = req.body;

    try{
      if (!email) {
        return res.status(400).json({error: 'Email field is required'});
      }

      if (!password) {
        return res.status(400).json({error: 'Password field is required'});
      }

      let foundUser = await prisma.users.findOne({ where: { email: email } });

      if (foundUser){
        const hassPassword = hashPass(password);
        if (hassPassword == foundUser.password){
          delete foundUser.password
  
          const token = jwt.sign({...foundUser}, key,{
            expiresIn: '7d'
          })
  
          return res.status(200).json({message: 'Login succesful', token });
        } else {
          return res.status(400).json({error: 'Invalid login credentials.'});
        }
        
      } else {
        return res.status(400).json({error: 'Invalid login credentials.'});
      }
    
    } catch(e) {
      return res.status(500).json({
        error: 'An error occured, pls try again later.' + e,
        e
      });
    }

  }
  res.setHeader('Allow', ['POST'])
  return res.status(405).end(`Method ${method} Not Allowed`)
}
