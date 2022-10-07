import axios from 'axios';
const baseUrl = '/api/login';

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const setUser = (user) => {
  user && window.localStorage.setItem('blogsAppUser', JSON.stringify(user));
};

const getUser = () => {
  const userString = window.localStorage.getItem('blogsAppUser');
  return userString && JSON.parse(userString);
};

const loginService = { login, setUser, getUser };

export default loginService;
