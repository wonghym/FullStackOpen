const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("get blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("should return blogs with right unique identifier property", async () => {
    const response = await api.get("/api/blogs");

    response.body.forEach((blog) => {
      assert(Object.keys(blog).includes("_id"));
      assert.strictEqual(Object.keys(blog).includes("id"), false);
    });
  });
});

describe("post blogs", () => {
  test("create new blog", async () => {
    await api
      .post("/api/blogs")
      .send(helper.newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const updatedBlogs = await helper.blogsInDb();
    assert.strictEqual(updatedBlogs.length, helper.initialBlogs.length + 1);

    const contents = updatedBlogs.map((blog) => blog.contents);
    assert(contents.includes(helper.newBlog.contents));
  });

  test("new blog with no likes", async () => {
    const response = await api
      .post("/api/blogs")
      .send(helper.newBlogWithoutLikes);
    assert.strictEqual(1, 1);

    assert.strictEqual(response.body.likes, 0);
  });

  test("new blog with no title", async () => {
    await api.post("/api/blogs").send(helper.blogWithoutTitle).expect(400);
  });

  test("new blog with no url", async () => {
    await api.post("/api/blogs").send(helper.blogWithoutUrl).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
  console.log("Connection closed");
});
