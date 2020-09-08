import * as assert from 'uvu/assert';
import { createMocks } from 'node-mocks-http';
import "hard-rejection/register";
import { PrismaClient } from "@prisma/client";
import { suite } from "uvu";

import getNotes from '../pages/api/notes/index';
import createNotes from '../pages/api/notes/create';
import oneNote from '../pages/api/notes/[noteId]';



console.log(process.env.TEST_DATABASE_URL);
const Notes = suite("Notes API");

Notes.before(async (context) => {
	context.prisma = new PrismaClient();
	await context.prisma.$queryRaw("DELETE from notes;");
});

Notes.after(async (context) => {
	await context.prisma.$queryRaw("DELETE from notes;");
	await context.prisma.$queryRaw('ALTER SEQUENCE notes_id_seq RESTART WITH 1;');
	const count = await context.prisma.notes.count();
	assert.is(count, 0);
});


Notes('/api/notes/create', async (context) => {
  const { req, res } = createMocks({
    method: 'POST',
    body: {
      title: "Test 1",
      description: "Really amazing ooooooooo, now we shall begin."   
    }
  });
  const countBf = await context.prisma.notes.count();
  await createNotes(req, res);
  const countAf = await context.prisma.notes.count();

  const data = res._getJSONData();
  assert.is(data.title, 'Test 1')
  assert.is(data.user, null)
  assert.is(res._getStatusCode(), 201)
  assert.is(countBf, 0)
  assert.is(countAf, 1)
});


Notes('/api/notes/[noteId] - get one: found', async (context) => {
  const { req, res } = createMocks({
    method: 'GET',
    query: {
      noteId: 1
    }
  });

  await oneNote(req, res);

  const data = res._getJSONData().data;
  assert.is(data.title, 'Test 1')
  assert.is(data.user, null)
  assert.is(res._getStatusCode(), 200)
});


Notes('/api/notes/[noteId] - get one: not found 404', async (context) => {
  const { req, res } = createMocks({
    method: 'GET',
    query: {
      noteId: 12222
    }
  });

  await oneNote(req, res);

  const data = res._getJSONData();
  assert.is(data.error, 'Note not found!')
  assert.is(res._getStatusCode(), 404)
});


Notes('/api/notes/[noteId] - update: sucess', async (context) => {
  const { req, res } = createMocks({
    method: 'PUT',
    query: {
      noteId: 1
    },
    body: {
      title: "Test - update",
      description: "Really amazing ooooooooo, now we shall begin.",
      user: 'proxie'
    }
  });

  await oneNote(req, res);

  const data = res._getJSONData().data;

  assert.is(data.title, 'Test - update')
  assert.is(data.user, 'proxie')
  assert.is(res._getStatusCode(), 200)
});

Notes('/api/notes - get only null users - confirm', async (context) => {
  const { req, res } = createMocks({
    method: 'GET'
  });

  await getNotes(req, res);
  const count = await context.prisma.notes.count();
  assert.is(count, 1)
  const data = res._getJSONData();
  assert.is(data.data.length, 0)
  assert.is(res._getStatusCode(), 200)
});

Notes('/api/notes/[noteId] - delete: sucess', async (context) => {
  const { req, res } = createMocks({
    method: 'DELETE',
    query: {
      noteId: 1
    }
  });

  await oneNote(req, res);
  const count = await context.prisma.notes.count();

  const data = res._getJSONData();
  assert.is(data.message, 'Note deleted succesfully')
  assert.is(count, 0)
  assert.is(res._getStatusCode(), 200)
});


Notes.run();
