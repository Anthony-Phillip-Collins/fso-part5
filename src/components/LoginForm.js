import { useState } from 'react';
import PropTypes from 'prop-types';

function LoginForm({ login }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    login({ username, password });
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
      data-test="login-form"
    >
      <label>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          data-test="username"
        />
      </label>
      <label>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          data-test="password"
        />
      </label>
      <button type="submit">login</button>
    </form>
  );
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
