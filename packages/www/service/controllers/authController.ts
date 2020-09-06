import { userService } from '../db';
import { authHelper } from '../utils';

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const registeredUser = await userService.findByUsername(username);
    if (!registeredUser) {
      return res.status(400).json({
        status: 'error',
        error: 'Invalid username or password'
      })
    }
    const match = await authHelper.comparePassword(password, registeredUser.password);
    if (!match) {
      return res.status(401).json({
        status: 'error',
        error: 'Invalid user credentials'
      })
    }
    const token = await authHelper.signJwtToken({
      username: registeredUser.username,
      email: registeredUser.email,
      admin: registeredUser.is_admin
    })
    return res.status(200).json({
      status: 'success',
      data: {
        message: 'Successfully logged in',
        username: registeredUser.username,
        token: token,
      }
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: 'Something went wrong'
    })
  }
}

export { login };
