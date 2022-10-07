import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import CreateForm from './components/CreateForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();
  const [message, setMessage] = useState('');
  const [hasError, setHasError] = useState(false);

  const onLoginSuccess = () => {
    setUser(loginService.getUser());
  };

  const onLoginFail = (error) => {
    showNotification({
      message:
        error.response.data.error.message || 'invalid username or password',
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
  };

  const onCreateFail = (error) => {
    showNotification({
      message: error.response.data.error.message,
      isError: true,
    });
  };

  const showNotification = ({ message, isError = false }) => {
    setMessage(message);
    setHasError(isError);

    setTimeout(() => {
      setHasError(false);
      setMessage('');
    }, 5000);
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
          <CreateForm onSuccess={onCreateSuccess} onFail={onCreateFail} />
        </div>

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
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
