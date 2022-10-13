import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import blogService from './services/blogs';
import loginService from './services/login';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();
  const [notification, setNotification] = useState({
    message: '',
    error: null,
    isError: false,
  });
  const toggleRef = useRef();
  const blogFormRef = useRef();

  const onLogin = async ({ username, password }) => {
    try {
      const data = await loginService.login({ username, password });
      loginService.setUser(data);
      setUser(loginService.getUser());
    } catch (error) {
      setNotification({ error });
    }
  };

  const onLogout = (e) => {
    e.preventDefault();
    loginService.logout();
    setUser(null);
  };

  const onBlogCreate = async ({ title, author, url }) => {
    const blog = { title, author, url };
    try {
      const data = await blogService.create(blog);
      setNotification({
        message: `The blog named '${data.title}' has been added.`,
      });

      setBlogs(blogs.concat(data));

      blogFormRef.current.clearFields();
      toggleRef.current.toggle();
    } catch (error) {
      setNotification({ error });
    }
  };

  const onBlogUpdate = async ({ author, title, url, likes, id }) => {
    try {
      const update = await blogService.update({
        author,
        title,
        url,
        likes,
        id,
      });

      setNotification({
        message: `The blog named '${update.title}' has been updated.`,
      });

      const updatedBlogs = blogs.map((old) =>
        old.id !== update.id ? old : { ...old, ...update }
      );

      setBlogs(updatedBlogs);
    } catch (error) {
      setNotification({ error });
    }
  };

  const onBlogDelete = async (id) => {
    try {
      await blogService.remove({ id });
      const deleted = blogs.find((blog) => blog.id === id);

      setNotification({
        message: `Blog "${deleted.title}" successfully deleted.`,
      });

      const updatedBlogs = blogs.filter((blog) => blog.id !== id);
      setBlogs(updatedBlogs);
    } catch (error) {
      setNotification({ error });
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const allBlogs = await blogService.getAll();
        setBlogs(allBlogs);
      } catch (error) {
        console.error(error.message);
      }
    };
    init();
  }, []);

  useEffect(() => {
    setUser(loginService.getUser());
  }, []);

  if (user) {
    return (
      <>
        <h2>blogs</h2>

        <Notification notification={notification} />

        <div style={{ marginBottom: '2rem' }} data-test="logout">
          Logged in as <b>{user.name}</b>.{' '}
          <form onSubmit={onLogout} style={{ display: 'inline' }}>
            <button type="submit">Log out</button>
          </form>
        </div>

        <h2>create new</h2>
        <div style={{ marginBottom: '2rem' }}>
          <Toggleable
            buttonLabelShow="create"
            buttonLabelHide="cancel"
            ref={toggleRef}
          >
            <BlogForm create={onBlogCreate} ref={blogFormRef} />
          </Toggleable>
        </div>

        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              loggedInUser={user}
              onUpdate={onBlogUpdate}
              onDelete={onBlogDelete}
            />
          ))}
      </>
    );
  }

  return (
    <>
      <h2>Log in</h2>
      <Notification notification={notification} />
      <LoginForm login={onLogin} />
    </>
  );
}

export default App;
