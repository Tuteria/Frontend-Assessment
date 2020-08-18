import App from "../src";
import "../src/env";
import request from "supertest";
import * as assert from "uvu/assert";
import "hard-rejection/register";
import { PrismaClient } from "@prisma/client";
import { suite } from "uvu";


console.log(process.env.TEST_DATABASE_URL);
const Accounts = suite("Accounts API");


Accounts.before(async (context) => {
  // context.prisma = await beforeCallback();
  context.prisma = new PrismaClient();
  App.locals.prisma = context.prisma;
  await context.prisma.queryRaw("DELETE from accounts;");
});

Accounts.after(async (context) => {
  await context.prisma.queryRaw("DELETE from accounts;");
  const count = await context.prisma.accounts.count();
  assert.is(count, 0);
});

Accounts("Create endpoint works as expected", async (context) => {
  await request(App)
    .post("/accounts/create")
    .send({
      username: "main_account",
      api_key: "fjojoewjoijeoijwoijewoijewoi",
      api_secret: "jawoejoawjeioajewoijaoiew"
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .then((response) => {
      assert.is(response.body.owner, "main_account");
    });
  const count = await context.prisma.accounts.count();
  assert.is(count, 1);
});

Accounts.run();
