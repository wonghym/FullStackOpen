const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middlewares");
const loginRouter = require("./controllers/login");

const app = express();

app.use(express.json());

const mongoUrl =
  process.env.NODE_ENV === "test"
    ? config.TEST_MONGODB_URI
    : config.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.errorHandler);

module.exports = app;
