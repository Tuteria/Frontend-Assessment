import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from 'next';

const key = process.env.SECRET_KEY || "this∂®ƒ†®coulud%3be%-real man";

export default function isAdmin (req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {

    const token = req.body.token || req.query.token || req.headers["token"];

      if (!token) {
        return res.status(401).send({
          error: "Unauthorised User!",
        });
      } else {
        jwt.verify(token, key, (err: any, decoded: any) => {
          if (err) {
            return res.status(401).send({
              error: "Token could not be authenticated",
            });
          }
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
