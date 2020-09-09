// Helper functions for populating and
// clearing records in database during tests.

import { PrismaClient } from "@prisma/client";
import faker from 'faker';
import { generateHash } from '../service/utils/authHelper'

const prisma = new PrismaClient();

/**
 * Deletes all records from the notes table in the db
 */
async function clearNotes() {
  await prisma.$queryRaw("DELETE from notes;");
  const count = await prisma.notes.count();
  return count;
}

/**
 * Insert sample records into the notes table in the db
 * @param size - number of records to insert into the notes table
 */
async function loadNotes(size = 1) {
  const notes = [];
  for (let i = 0; i < size; i++) {
    const note = await prisma.notes.create({
      data: {
        title: faker.lorem.sentence(),
        description: faker.lorem.sentences(),
      }
    });
    notes.push(note);
  }

  return notes;
}

/**
 * Deletes all records from the users table in the db
 */
async function clearUsers() {
  await prisma.$queryRaw("DELETE from users;");
  const count = await prisma.users.count();
  return count;
}

/**
 * Insert sample records into the users table in the db
 * @param size - number of records to insert into the notes table
 */
async function loadUsers(size = 1) {
  const users = [];

  for (let i = 0; i < size; i++) {
    const password = faker.internet.password();
    const hashedPassword = await generateHash(password);
    const user = await prisma.users.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: hashedPassword,
        is_admin: false
      }
    })

    // Password was included to enable testing
    user.password = password;
    users.push(user);
  }

  return users;
}

/**
 * Insert sample records of users' notes into notes table in the db
 * @param user_id - id of the user that created the note.
 * @param size - number of records to insert into the notes table
 */
async function loadUserNotes(user_id: number, size = 1) {
  const notes = [];

  for (let i = 0; i < size; i++) {
    const note = await prisma.notes.create({
      data: {
        title: faker.lorem.sentence(),
        description: faker.lorem.sentences(),
        user_id: user_id
      }
    });
    notes.push(note);
  }

  return notes;
}

export { clearNotes, loadNotes, clearUsers, loadUsers, loadUserNotes }
