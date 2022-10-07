import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import CreateForm from './components/CreateForm';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();

  const onLoginSuccess = () => {
    setUser(loginService.getUser());
    console.log('LOGIN SUCCESS', loginService.getUser());
  };

  const onLoginFail = (error) => {
    console.log('LOGIN FAIL', error.message);
  };

  const onLogout = (e) => {
    e.preventDefault();
    loginService.logout();
    setUser(null);
  };

  const onCreateSuccess = (e) => {
    console.log(e);
  };

  const onCreateFail = (e) => {
    console.log(e);
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
      <LoginForm onSuccess={onLoginSuccess} onFail={onLoginFail} />
    </>
  );
};

export default App;
