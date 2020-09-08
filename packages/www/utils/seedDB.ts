// import { PrismaClient } from "@prisma/client";
// import faker from 'faker';

const { PrismaClient } = require('@prisma/client');
const faker = require('faker');

const prisma = new PrismaClient();

async function clearNotes() {
  await prisma.$queryRaw("DELETE from notes;");
  const count = await prisma.notes.count();
  return count;
}

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

async function clearUsers() {
  await prisma.$queryRaw("DELETE from users;");
  const count = await prisma.users.count();
  return count;
}

async function loadUsers(size = 1) {
  const users = [];

  for (let i = 0; i < size; i++) {
    const user = await prisma.users.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      }
    })
    users.push(user)
  }

  return users;
}

export { clearNotes, loadNotes, clearUsers, loadUsers }