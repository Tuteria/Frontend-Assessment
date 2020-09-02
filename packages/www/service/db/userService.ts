import prisma from './prisma';

type User = {
  username: string
  email: string
  is_admin: boolean
  password: string
}

/**
 * Retrieves a user that matches a username
 * @param username 
 */
async function findByUsername(username: string) {
  try {
    const user = await prisma.users.findOne({
      where: {username: username}
    });
    return user
  } catch (error) {
    return error
  }
}

/**
 * Retrieves a user that matches an email
 * @param id 
 */
async function findByEmail(email: string) {
  try {
    const user = await prisma.users.findOne({
      where: {email: email}
    });
    return user
  } catch (error) {
    return error
  }
}

/**
 * Retrieves a user that matches an id
 * @param id 
 */
async function findById(id: number) {
  try {
    const user = await prisma.users.findOne({
      where: {id: id}
    });
    return user
  } catch (error) {
    return error
  }
}

/**
 * Saves a new user in the db
 * @param user - New user
 */
async function createUser(user: User) {
  const { username, email, is_admin, password } = user;
  try {
    const createdUser = await prisma.users.create({
      data: { username, email, is_admin, password }
    })
    return createdUser;
  } catch (error) {
    return error;
  }
}

export {createUser, findByEmail, findById, findByUsername };
