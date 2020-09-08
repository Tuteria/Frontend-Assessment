import request from "supertest";
import * as assert from "uvu/assert";
import "hard-rejection/register";
import { PrismaClient } from "@prisma/client";
import { suite } from "uvu";
import { createServer } from "http";
import { NextApiHandler } from "next";
import { apiResolver } from "next/dist/next-server/server/api-utils";
import noteHandler from '../../pages/api/notes/index'; 

export const testClient = async (handler: NextApiHandler, {
  host = "http://localhost:3000",
}: { host?: string } = {}) => request(
  createServer(
    async (req, res) => {
      req.headers.host = host;

      return apiResolver(req, res, undefined, handler, {} as any, undefined);
    },
  ),
);


const Notes = suite("Notes API");

Notes("Check host is as expected as expected", async (context) => {
  const client = await testClient(noteHandler)
  await client.get('/users')
  .set('Accept', 'application/json')
  .expect(200)
  .then((response) => {
    assert.is(response.body.status, "success");
  });

});



Notes.run();
