import { authHelper } from '../utils';
import { userService } from '../db';

export default function jwtParser(handler) {
  return async(req, res) => {
    const authorizationHeaader = req.headers.authorization;
    if (!authorizationHeaader) {
      return handler(req, res);
    }
    const token = req.headers.authorization.split(' ')[1];
    // just for admin authentication//////////////////////////
    if (token === process.env.ADMIN_TOKEN) {  //
      req.user = {is_admin: true};            //
      return handler(req, res);               //
    }                                         //
    ////////////////////////////////////////////
    try {
      const decoded: any = await authHelper.decodeJwtToken(token);
      const user = await userService.findByUsername(decoded.username);
      if (!user) {
        return res.status(401).json({
          status: "error",
          error: 'Invalid user credentials',
        });
      }
      req.user = decoded
      return handler(req, res);
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        status: "error",
        error: 'Something went ',
      });
    }
    
  }
}
