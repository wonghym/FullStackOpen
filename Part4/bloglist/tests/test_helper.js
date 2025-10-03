const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
];

const newBlog = {
  title: "Type wars",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  likes: 2,
};

const newBlogWithoutLikes = {
  title: "TDD harms architecture",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
};

const blogWithoutTitle = {
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 7,
};

const blogWithoutUrl = {
  title: "React patterns",
  author: "Michael Chan",
  likes: 7,
};

const initialUsers = [
  {
    username: "user",
    passwordHash: "secret",
  },
  {
    username: "user2",
    password: "secret",
  },
];

const loginUser = {
  username: "loginUser",
  password: "secret",
};

const uniqueUser = {
  username: "unique",
  password: "secret",
};

const notUniqueUser = {
  username: "user",
  password: "secret",
};

const userWithOutPassword = {
  username: "user3",
};

const userWithTooShortPassword = {
  username: "user4",
  password: "pw",
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  newBlog,
  newBlogWithoutLikes,
  blogWithoutTitle,
  blogWithoutUrl,
  initialUsers,
  loginUser,
  uniqueUser,
  notUniqueUser,
  userWithOutPassword,
  userWithTooShortPassword,
  blogsInDb,
  usersInDb,
};
