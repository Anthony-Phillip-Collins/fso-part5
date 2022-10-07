import { useState } from 'react';
import loginService from '../services/login';

const LoginForm = ({ onSuccess, onFail }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginService.login({ username, password });
      setUsername('');
      setPassword('');
      loginService.setUser(response);
      onSuccess();
    } catch (error) {
      onFail(error.response.data.error.message);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <label>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <label>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <button type='submit'>login</button>
    </form>
  );
};

export default LoginForm;
