import axios from 'axios';
const baseUrl = '/api/login';

const Key = 'blogsAppUser';

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const logout = () => {
  window.localStorage.removeItem(Key);
};

const setUser = (user) => {
  user && window.localStorage.setItem(Key, JSON.stringify(user));
};

const getUser = () => {
  const userString = window.localStorage.getItem(Key);
  return userString && JSON.parse(userString);
};

const loginService = { login, logout, setUser, getUser };

export default loginService;
