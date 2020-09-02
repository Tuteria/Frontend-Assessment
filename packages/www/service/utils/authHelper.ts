import { hash, compare } from 'bcrypt';

const saltRound = 10;

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

export { comparePassword, generateHash };
