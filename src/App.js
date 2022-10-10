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
  const [notificationTimeout, setNotificationTimeout] = useState(null);
  const [message, setMessage] = useState('');
  const [hasError, setHasError] = useState(false);
  const toggleRef = useRef();

  const onLoginSuccess = () => {
    setUser(loginService.getUser());
  };

  const onLoginFail = (error) => {
    showNotification({
      message:
        error.response.data.error?.message || 'invalid username or password',
      isError: true,
    });
  };

  const onLogout = (e) => {
    e.preventDefault();
    loginService.logout();
    setUser(null);
  };

  const onCreateSuccess = (blog) => {
    showNotification({
      message: `The blog named '${blog.title}' has been added.`,
    });

    setBlogs(blogs.concat(blog));

    toggleRef.current.toggle();
  };

  const onCreateFail = (error) => {
    showNotification({
      message: error.response.data.error.message,
      isError: true,
    });
  };

  const onBlogUpdateSuccess = (blog) => {
    showNotification({
      message: `The blog named '${blog.title}' has been updated.`,
    });

    const updated = blogs.map((old) =>
      old.id !== blog.id ? old : { old, ...blog }
    );

    setBlogs(updated);
  };

  const onBlogUpdateFail = (error) => {
    showNotification({
      message: error.response.data.error.message,
      isError: true,
    });
  };

  const showNotification = ({ message, isError = false }) => {
    setMessage(message);
    setHasError(isError);

    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
    }

    const id = setTimeout(() => {
      setHasError(false);
      setMessage('');
    }, 5000);

    setNotificationTimeout(id);
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

        <Notification message={message} isError={hasError} />

        <div style={{ marginBottom: '2rem' }}>
          Logged in as {user.name}.{' '}
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
            />
          ))}
      </>
    );
  }

  return (
    <>
      <h2>Log in</h2>
      <Notification message={message} isError={hasError} />
      <LoginForm onSuccess={onLoginSuccess} onFail={onLoginFail} />
    </>
  );
};

export default App;
