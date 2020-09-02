import { authHelper } from '../utils';
import { userService } from '../db';

async function createUser(req, res) {
  const { username, email, password } = req.body
  try {
    const userById = await userService.findByUsername(username);
    if (userById) {
      return res.status(409).json({
        status: 'error',
        error: 'Username already taken',
      });
    }
    const userByEmail = await userService.findByEmail(email);
    if (userByEmail) {
      return res.status(409).json({
        status: 'error',
        error: 'Email already registered',
      });
    }
    const hashedPassword = await authHelper.generateHash(password);
    const createdUser = await userService.createUser({
      username,
      email,
      is_admin: false,
      password: hashedPassword
    })
    return res.status(200).json({
      status: 'success',
      data: {
        message: 'User successfully created',
        email: createdUser.email,
        username: createdUser.username,
      }
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      'error': 'Something went wrong'
    })
  }
}

export { createUser };
