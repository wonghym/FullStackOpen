const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
});

describe("post user", () => {
  test("create user", async () => {
    await api
      .post("/api/users")
      .send(helper.uniqueUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const allUsers = await helper.usersInDb();
    assert.deepEqual(allUsers.length, helper.initialUsers.length + 1);
  });

  test("create user with not unique username", async () => {
    const response = await api.post("/api/users").send(helper.notUniqueUser);

    assert.deepEqual(response.status, 400);
    assert(response.body.error.includes("expected `username` to be unique"));
  });

  test("create user with no password", async () => {
    const response = await api
      .post("/api/users")
      .send(helper.userWithOutPassword);

    assert.deepEqual(response.status, 400);
    assert(response.body.error.includes("Missing password"));
  });

  test("create user with short password", async () => {
    const response = await api
      .post("/api/users")
      .send(helper.userWithTooShortPassword);

    assert.deepEqual(response.status, 400);
    assert(
      response.body.error.includes("password should be at least 3 letters long")
    );
  });
});

after(async () => {
  await mongoose.connection.close();
  console.log("Connection closed");
});
