import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

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
          <BlogForm addBlog={addBlog} />
          {blogs.map((blog) => (
            <Blog key={blog._id} blog={blog} />
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
