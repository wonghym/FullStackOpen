import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    console.log(`${user.name} logged out`);
    setUser(null);
    blogService.setToken(null);
  };

  const addBlog = async (newBlog) => {
    try {
      const addedBlog = await blogService.create(newBlog);
      handleNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        "message"
      );
      setBlogs(blogs.concat(addedBlog));
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const sortBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes);
  };

  const updateLikes = async (blog) => {
    const { id, title, author, url, likes } = blog;
    try {
      const updatedBlog = await blogService.update({
        id,
        title,
        author,
        url,
        likes: likes + 1,
      });
      setBlogs(
        sortBlogs(
          blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
        )
      );
    } catch (error) {
      handleError(error);
    }
  };

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        console.log(blog.user.id);
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((entry) => entry.id !== blog.id));
        handleNotification(
          `blog ${blog.title} by ${blog.author} was deleted`,
          "message"
        );
      } catch (error) {
        console.log(error);
        handleError(error);
      }
    }
  };

  const handleNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleError = (error) => {
    if (error.response.data.error) {
      handleNotification(error.response.data.error, "error");
    } else {
      handleNotification("Unknown error", "error");
    }
  };

  return (
    <div>
      {user ? (
        <>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel={{ show: "create new blog", hide: "cancel" }}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              updateLikes={updateLikes}
              deleteBlog={deleteBlog}
            />
          ))}
        </>
      ) : (
        <>
          <h2>login to application</h2>
          <Notification notification={notification} />
          <LoginForm
            setUser={setUser}
            handleNotification={handleNotification}
          />
        </>
      )}
    </div>
  );
};

export default App;
