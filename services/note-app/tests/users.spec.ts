import * as assert from 'uvu/assert';
import { createMocks } from 'node-mocks-http';
import "hard-rejection/register";
import { PrismaClient } from "@prisma/client";
import { suite } from "uvu";
import crypto from "crypto";


import getUsers from '../pages/api/users/index';
import loginUsers from '../pages/api/users/auth';
import createUsers from '../pages/api/users/create';
import userNotesAuth from '../pages/api/users/[username]/notes';
let token: any;


const Users = suite("Users API");

function hashPass(str: string) {
	const shasum = crypto.createHash("sha512");
	shasum.update(str);
	return shasum.digest("hex");
}

const passHash = hashPass('password');

Users.before(async (context) => {
	context.prisma = new PrismaClient();
  await context.prisma.$queryRaw("DELETE from users;");
  await context.prisma.users.create({
    data: { 
      username: 'proxie', 
      password: passHash, 
      email: 'email@me.com', 
      role: 'admin' 
    },
  });
  
});

Users.after(async (context) => {
	await context.prisma.$queryRaw("DELETE from users;");
	await context.prisma.$queryRaw('ALTER SEQUENCE users_id_seq RESTART WITH 1;');
  const count = await context.prisma.users.count();
	assert.is(count, 0);
});


Users('/api/users/auth', async (context) => {
  const { req, res } = createMocks({
    method: 'POST',
    body: {
      email: "email@me.com",
      password: "password"   
    }
  });

  await loginUsers(req, res);

  const data = res._getJSONData();
  token = data.token
  assert.is(typeof token, 'string')
  assert.is(res._getStatusCode(), 200)
});


Users('/api/users/create', async (context) => {
  const { req, res } = createMocks({
    method: 'POST',
    body: {
      email: "email_@me.com",
      password: "password",
      username: "proxie_",
      role: 'user',
      token
    }
  });
 
  await createUsers(req, res);
  const data = res._getJSONData();
  assert.is(data.message, 'User created succesfully')
  assert.is(res._getStatusCode(), 201)
});


Users('/api/users/[username]/notes', async (context) => {
  const { req, res } = createMocks({
    method: 'GET',
    body: {
      token
    },
    query: {
      username: 'proxie'
    }
  });

  await userNotesAuth(req, res);
  
  const data = res._getJSONData().data;
  assert.is(data.notes.length, 0)
  assert.is(res._getStatusCode(), 200)
});




Users.run();
