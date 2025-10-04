import { useState } from "react";

const Blog = ({ blog, user, updateLikes, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      </div>
      {visible && (
        <>
          {blog.url}
          <div>
            likes {blog.likes}{" "}
            <button onClick={() => updateLikes(blog)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.name === user.username && (
            <div>
              <button onClick={() => deleteBlog(blog)}>remove</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
