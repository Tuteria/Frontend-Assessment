import { NextApiRequest } from 'next';

function admin(handler) {
  return async (req, res) => {
    if (req.user && req.user.is_admin) {
      return handler(req, res);
    } else {
      res.status(403).json({
        status: 'error',
        error: 'You are not authorized this operation' 
      })
    }
  }
}

function user(handler) {
  return async (req, res) => {
    if (!req.user) {
      res.status(401).json({
        status: 'error',
        error: 'User must be looged in' 
      })
    }
    if (req.user.is_admin) {
      return handler(req, res)
    }
    if (req.user.username === req.query.username) {
      return handler(req, res)
    } else {
      res.status(403).json({
        status: 'error',
        error: 'You are not authorized for this operation' 
      })
    }
  }
}

export { admin, user }
