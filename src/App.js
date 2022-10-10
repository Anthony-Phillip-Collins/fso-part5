import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();
  const [notification, setNotification] = useState({
    message: '',
    error: null,
    isError: false,
  });
  const toggleRef = useRef();

  const onLoginSuccess = () => {
    setUser(loginService.getUser());
  };

  const onLoginFail = (error) => {
    setNotification({ error });
  };

  const onLogout = (e) => {
    e.preventDefault();
    loginService.logout();
    setUser(null);
  };

  const onCreateSuccess = (blog) => {
    setNotification({
      message: `The blog named '${blog.title}' has been added.`,
    });

    setBlogs(blogs.concat(blog));

    toggleRef.current.toggle();
  };

  const onCreateFail = (error) => {
    setNotification({ error });
  };

  const onBlogUpdateSuccess = (blog) => {
    setNotification({
      message: `The blog named '${blog.title}' has been updated.`,
    });

    const updated = blogs.map((old) =>
      old.id !== blog.id ? old : { ...old, ...blog }
    );

    setBlogs(updated);
  };

  const onBlogUpdateFail = (error) => {
    setNotification({ error });
  };

  const onBlogDeleteSuccess = (id) => {
    const deleted = blogs.find((blog) => blog.id === id);
    setNotification({
      message: `Blog "${deleted.title}" successfully deleted.`,
    });

    const updated = blogs.filter((blog) => blog.id !== id);
    setBlogs(updated);
  };

  const onBlogDeleteFail = (error) => {
    setNotification({ error });
  };

  const onNotificationHidden = () => {
    setNotification(null);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
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

        <Notification {...notification} onHidden={onNotificationHidden} />

        <div style={{ marginBottom: '2rem' }}>
          Logged in as <b>{user.name}</b>.{' '}
          <form onSubmit={onLogout} style={{ display: 'inline' }}>
            <button type='submit'>Log out</button>
          </form>
        </div>

        <h2>create new</h2>
        <div style={{ marginBottom: '2rem' }}>
          <Toggleable
            buttonLabelShow='create'
            buttonLabelHide='cancel'
            ref={toggleRef}
          >
            <BlogForm onSuccess={onCreateSuccess} onFail={onCreateFail} />
          </Toggleable>
        </div>

        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              {...blog}
              onUpdateSuccess={onBlogUpdateSuccess}
              onUpdateFail={onBlogUpdateFail}
              onDeleteSuccess={onBlogDeleteSuccess}
              onDeleteFail={onBlogDeleteFail}
            />
          ))}
      </>
    );
  }

  return (
    <>
      <h2>Log in</h2>
      <Notification {...notification} onHidden={onNotificationHidden} />
      <LoginForm onSuccess={onLoginSuccess} onFail={onLoginFail} />
    </>
  );
};

export default App;
