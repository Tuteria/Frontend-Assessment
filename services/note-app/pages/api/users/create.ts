import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import crypto from "crypto";

function hashPass(str: string) {
	const shasum = crypto.createHash("sha512");
	shasum.update(str);
	return shasum.digest("hex");
}


function isAdmin (req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {

    const token = req.body.token || req.query.token || req.headers["x-token"];
      if (!token) {
        return res.status(401).send({
          message: "Unauthorised User!",
        });
      } else {
        jwt.verify(token, key, (err: any, decoded: any) => {
          if (err) {
            return res.status(403).send({
              error: "Token could not be authenticated",
            });
          }
          console.log(decoded, '<<<<<')
          if (decoded.role.toLowerCase() === "admin") {
            return resolve(decoded)
            
          } else {
            return res.status(403).send({
              error:
                "You are not authorized to perform this action! Pls contact admin.",
            });
          }
        });
      }
   })
}

const key = process.env.SECRET_KEY || "this∂®ƒ†®coulud%3be%-real man";
const prisma = new PrismaClient()


export default async  (req: NextApiRequest, res: NextApiResponse) => {
  const { method } =  req;

  if (method === 'POST'){
    
    const admin = await isAdmin(req, res);

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
