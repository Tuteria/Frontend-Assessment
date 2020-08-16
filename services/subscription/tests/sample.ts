import { test } from "uvu";
import * as assert from "uvu/assert";
import request from "supertest";
import App from "../src";
import "hard-rejection/register";

test("should export Polka instance", () => {
  assert.is(App.constructor.name, "EventEmitter");

  assert.type(App.get, "function");
  assert.type(App.head, "function");
  assert.type(App.patch, "function");
  assert.type(App.connect, "function");
  assert.type(App.delete, "function");
  assert.type(App.post, "function");
});

// Option 1: Use `supertest` assertions
test('should receive "OK" for "GET /" route', async () => {
  await request(App)
    .get("/")
    .expect("Content-Type", /text\/plain/)
    .expect(200, "OK");
});

// Option 2: Save `supertest` request; assert directly
test('should receive "OK" for "GET /" route', async () => {
  const res = await request(App).get("/");
  assert.is(res.header["content-type"], "text/plain");
  assert.is(res.status, 200);
  assert.is(res.text, "OK");
});

test.run();
