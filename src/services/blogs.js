import axios from 'axios';
import loginService from './login';
const baseUrl = '/api/blogs';

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${loginService.getUser().token}`,
  },
});

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const create = async (newBlog) => {
  const { data } = await axios.post(baseUrl, newBlog, authConfig());
  return data;
};
const blogService = { getAll, create };

export default blogService;
