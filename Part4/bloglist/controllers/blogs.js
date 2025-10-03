const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middlewares");

blogsRouter.get("/", async (request, response) => {
  await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .then((blogs) => {
      response.json(blogs);
    });
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const { user } = request;

  if (!user) {
    return response.status(400).json({ error: "UserId missing or not valid" });
  }

  const { title, author, url, likes } = request.body;

  if (!title || !url) {
    response.status(400).json({ error: "title or url is missing" });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save({ validateModifiedOnly: true });

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const { user } = request;

  if (!user) {
    return response.status(401).json({ error: "token invalid" });
  }

  const blog = await Blog.findById(request.params.id);

  if (blog?.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } else {
    response.status(401).json({ error: "unauthorized access" });
  }
});

module.exports = blogsRouter;
