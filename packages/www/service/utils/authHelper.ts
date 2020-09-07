import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../../constants';

const saltRound = 10;
const options = {
  expiresIn: '3d'
}

/**
 * Generates hash from a password
 * @param password - Plain text password
 * @returns {Promise} - Resolves to a hased password if there is no error
 */
function generateHash(password: string): Promise<any> {
  return hash(password, saltRound)
    .then((hashedPassword) => hashedPassword)
    .catch((err) => err);
}

/**
 * Compares a plain text password with a hashed password
 * @param password - Plain text password
 * @param hash - Hashed password
 * @return {Promise} - Resolves to a boolean value if there is no error
 */
function comparePassword(password: string, hashedPassword: string): Promise<any> {
  return compare(password, hashedPassword)
    .then((result) => result)
    .catch((err) => err);
}

async function signJwtToken(payload) {
  return new Promise((resolve, reject) => {
    sign(payload, JWT_SECRET, options, (err, token) => {
      if (err) {
        return reject (err);
      }
      resolve(token);
    });
  })
}

async function decodeJwtToken(token) {
  return new Promise((resolve, reject) => {
    verify(token, JWT_SECRET, options, (err, result) => {
      if (err) {
        return reject(err)
      }
      resolve(result)
    });
  
  })
}

export { comparePassword, generateHash, signJwtToken, decodeJwtToken };
