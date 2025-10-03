const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => (sum += blog.likes), 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const blog = blogs.reduce((favourite, current) =>
    favourite.likes > current.likes ? favourite : current
  );

  return blog;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authorCount = lodash.countBy(blogs, blogAuthors);
  const mostAuthor = Object.keys(authorCount).reduce((a, b) =>
    authorCount[a] > authorCount[b] ? a : b
  );
  return { author: mostAuthor, blogs: authorCount[mostAuthor] };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const groupedBlogs = lodash.groupBy(blogs, blogAuthors);
  const authorLikes = Object.entries(groupedBlogs).map(([author, blogs]) => {
    const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0);
    return { author: author, likes: totalLikes };
  });

  return authorLikes.reduce((mostLike, current) =>
    mostLike.likes > current.likes ? mostLike : current
  );
};

const blogAuthors = (blog) => {
  return blog.author;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
